import request from 'supertest';
import express from 'express';
import { createServer } from '../server';

describe('Security Middleware', () => {
  let app: express.Application;

  beforeAll(async () => {
    // Configure higher rate limits for testing
    app = await createServer({
      enableMongo: false,
      security: {
        rateLimit: {
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 1000 // Higher limit for tests
        }
      }
    });
  });

  describe('Security Headers', () => {
    it('should set security headers correctly', async () => {
      const response = await request(app).get('/health');
      
      // Verify security headers are set
      expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
      expect(response.headers).toHaveProperty('x-frame-options', 'DENY');
      expect(response.headers).toHaveProperty('x-xss-protection', '1; mode=block');
      
      // Verify CSP headers
      expect(response.headers).toHaveProperty('content-security-policy');
      const csp = response.headers['content-security-policy'];
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self' 'unsafe-inline'");
      
      // Verify sensitive headers are removed
      expect(response.headers).not.toHaveProperty('x-powered-by');
    });
  });

  describe('Rate Limiting', () => {
    let limitApp: express.Application;

    beforeAll(async () => {
      // Create a new app instance with strict rate limits for testing
      limitApp = await createServer({
        enableMongo: false,
        security: {
          rateLimit: {
            windowMs: 1000, // 1 second window
            max: 3 // Only allow 3 requests
          }
        }
      });
    });

    it('should allow requests within rate limit', async () => {
      // Make requests within the limit
      for (let i = 0; i < 3; i++) {
        const response = await request(limitApp).get('/health');
        expect(response.status).toBe(200);
      }
    });

    it('should block requests exceeding rate limit', async () => {
      // Make more requests than the limit allows
      for (let i = 0; i < 3; i++) {
        await request(limitApp).get('/health');
      }
      
      // This request should be rate limited
      const response = await request(limitApp).get('/health');
      expect(response.status).toBe(429);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Parameter Pollution Protection', () => {
    it('should prevent parameter pollution', async () => {
      const response = await request(app)
        .get('/api/getinfo?param=value1&param=value2');
      
      // The response should be successful (HPP middleware should handle the duplicate params)
      expect(response.status).not.toBe(500);
    });
  });

  describe('CORS Configuration', () => {
    it('should handle CORS preflight requests', async () => {
      const response = await request(app)
        .options('/health')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'GET');
      
      expect(response.status).toBe(204);
      expect(response.headers).toHaveProperty('access-control-allow-methods');
    });

    it('should allow configured methods in CORS', async () => {
      const response = await request(app)
        .get('/health')
        .set('Origin', 'http://localhost:3000');
      
      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });

  describe('JSON Body Limit', () => {
    it('should reject large JSON payloads', async () => {
      // Create a large payload (>10kb)
      const largeData = { data: 'x'.repeat(11 * 1024) };
      
      const response = await request(app)
        .post('/health') // Use an existing endpoint
        .send(largeData)
        .set('Content-Type', 'application/json');
      
      // The request should be rejected before reaching the route handler
      expect(response.status).toBe(413);
    });

    it('should accept JSON payloads within limit', async () => {
      // Create a payload within limit
      const normalData = { data: 'test' };
      
      const response = await request(app)
        .post('/health') // Use an existing endpoint
        .send(normalData)
        .set('Content-Type', 'application/json');
      
      // Should not be rejected due to size
      expect(response.status).not.toBe(413);
    });
  });
}); 
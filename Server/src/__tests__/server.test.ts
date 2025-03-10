import request from 'supertest';
import express from 'express';
import { createServer } from '../server';

describe('Server', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = await createServer({ enableMongo: false });
  });

  describe('Health Check', () => {
    it('should return 200 for the health check endpoint', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });
}); 
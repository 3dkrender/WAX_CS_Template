# Security Guide

This document details the security measures implemented in the WAX Blockchain Client/Server Template.

## Overview

The template implements various security measures to protect against common web vulnerabilities and attacks. These measures are configured in the `Server/src/config/security.ts` file.

## Security Features

### 1. Rate Limiting
```typescript
// Limits requests from same IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit of 100 requests per window per IP
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
```

### 2. Helmet Security Headers
```typescript
const helmetConfig = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://wax.greymass.com", "https://wax.pink.gg", "https://wax.cryptolions.io"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    }
};
```

### 3. CORS Protection
- Origin validation
- Method restrictions
- Header restrictions
- Credentials handling

### 4. Request Validation
- Input validation using Zod
- Schema-based validation for all endpoints
- Structured error responses

### 5. Additional Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### 6. Body Parser Limits
- JSON body size limit: 10kb
- Protection against large payloads

### 7. Parameter Pollution Prevention
- HPP (HTTP Parameter Pollution) protection
- Prevents parameter override attacks

## Best Practices

### Environment Variables
- Never commit sensitive data
- Use `.env` files for configuration
- Different configurations for development and production

### API Security
1. Always validate input
2. Use HTTPS in production
3. Implement proper authentication
4. Keep dependencies updated
5. Log security events

### WAX Blockchain Security
1. Never store private keys in code
2. Use environment variables for sensitive data
3. Validate all blockchain transactions
4. Implement proper error handling

## Security Checklist

- [ ] Configure environment variables
- [ ] Set up CORS properly
- [ ] Enable rate limiting
- [ ] Configure Helmet security headers
- [ ] Implement input validation
- [ ] Set up proper logging
- [ ] Configure error handling
- [ ] Review security headers
- [ ] Test security measures

## Additional Recommendations

1. **Regular Updates**
   - Keep all dependencies updated
   - Monitor security advisories
   - Update security configurations as needed

2. **Monitoring**
   - Implement logging for security events
   - Monitor rate limiting triggers
   - Track failed validation attempts

3. **Production Deployment**
   - Use HTTPS
   - Configure proper CORS
   - Set appropriate rate limits
   - Enable all security headers

4. **Development Practices**
   - Regular security audits
   - Code review focus on security
   - Security testing implementation

## References

- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [WAX Security Guidelines](https://developer.wax.io/security/) 
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import { Express } from 'express';

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit of 100 requests per window per IP
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Helmet configuration
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
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
};

// Function to apply all security measures
export const applySecurityMiddleware = (app: Express) => {
    // Apply rate limiting
    app.use(limiter);

    // Apply Helmet with custom configuration
    app.use(helmet(helmetConfig));

    // Prevent Parameter Pollution
    app.use(hpp());

    // Additional security configurations
    app.use((req, res, next) => {
        // Remove headers that might expose sensitive information
        res.removeHeader('X-Powered-By');
        // Add additional security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}; 
import express from "express";
import { logger } from "./config/logger";
import morgan from "morgan";
import CFonts from "cfonts";
import cors from "cors";
import { applySecurityMiddleware, SecurityConfig } from "./config/security";
import helmet from 'helmet';
import waxRouter from './presentation/http/routes/wax.routes';

/**
 * Import Routes
 */
import {rtGetWAXApi } from "./routes/rtwaxapi";
import { rtGetMongoApi } from "./routes/rtmongoapi";

export interface ServerOptions {
  enableMongo?: boolean;
  security?: SecurityConfig;
  enableSecurity?: boolean;
}

export async function createServer(options: ServerOptions = {}) {
  const app = express();

  /**
   * Error Handler for uncaught exceptions
   */
  process.on("uncaughtException", function (err) {
    logger.error("Uncaught Exception: ", err);
  });

  /**
   * Middlewares
   */
  // Basic security middleware
  if (options.enableSecurity !== false) {
    app.use(helmet());
  }

  // JSON and URL-encoded parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configure CORS with restrictive options
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
  }));

  // Apply security measures with custom config if provided
  applySecurityMiddleware(app, options.security);

  // Logging middleware
  app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

  /**
   * Health Check Endpoint
   */
  app.route('/health')
    .get((req, res) => {
      res.status(200).json({ status: 'ok' });
    })
    .post((req, res) => {
      res.status(200).json({ status: 'ok', body: req.body });
    });

  /**
   * API Routes
   */
  // WAX API: http://<host>:<port>/api/<method>
  app.use("/api", waxRouter);
  
  // MongoDB API: http://<host>:<port>/db/<method>
  if (options.enableMongo) {
    app.use("/db", rtGetMongoApi);
  }

  /**
   * Error Handler (404)
   */
  app.use((err: any, req: any, res: any, next: any) => {
    const message = 'Route not found';
    const statusCode = 404;
    logger.warn(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      data: null,
    });
    next();
  });

  /**
   * Error Handler (500)
   */
  app.use((err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      data: null,
    });
    next();
  });

  // Startup banner
  CFonts.say('WAX API', {
    font: 'block',
    align: 'left',
    colors: ['system'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
  });

  return app;
}

/**
 * Server
 */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  createServer({ enableMongo: true }).then(app => {
    app.listen(PORT, async () => {
      CFonts.say(`NST ${process.env.npm_package_version}|Node Server Template|by 3DK Render`, {
        font: "console",
        align: "center",
        gradient: ["red", "magenta"],
        env: "node",
      });
      logger.info(`App listening to port ${PORT}`);
    });
  });
}

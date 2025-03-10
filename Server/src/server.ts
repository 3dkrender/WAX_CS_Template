import express from "express";
import { logger } from "./config/logger";
import morgan from "morgan";
import CFonts from "cfonts";
import cors from "cors";
import { applySecurityMiddleware } from "./config/security";

/**
 * Import Routes
 */
import {rtGetWAXApi } from "./routes/rtwaxapi";
import { rtGetMongoApi } from "./routes/rtmongoapi";

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Error Handler for uncaught exceptions
 */
process.on("uncaughtException", function (err) {
  logger.error("Uncaught Exception: ", err);
});

/**
 * Middlewares
 */
// Apply security measures
applySecurityMiddleware(app);

// Configure CORS with restrictive options
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(morgan('combined'));

/**
 * Middleware Routes
 */

// WAX API: http://<host>:<port>/api/<method>
app.use("/api", rtGetWAXApi);
// MongoDB API: http://<host>:<port>/db/<method>
app.use("/db", rtGetMongoApi);

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

/**
 * Server
 */
app.listen(PORT, async () => {
  CFonts.say(`NST ${process.env.npm_package_version}|Node Server Template|by 3DK Render`, {
    font: "console",
    align: "center",
    gradient: ["red", "magenta"],
    env: "node",
  });
  logger.info(`App listening to port ${PORT}`);
});

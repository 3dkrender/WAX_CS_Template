import express from "express";
import { logger } from "./config/logger";
import morgan from "morgan";
import CFonts from "cfonts";
import cors from "cors";

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
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

/**
 * Middleware Routes
 */
app.use("/api", rtGetWAXApi);
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

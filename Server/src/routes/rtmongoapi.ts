import express from "express";
import { 
  getDbInfo,
  dbGetUsers
 } from "../controllers";

/**
 * Router definitions for the MongoDB API
 */
const rtGetMongoApi = express.Router();

/**
 * GET /api/getdbinfo
 * @description Get database info
 */
rtGetMongoApi.get("/getdbinfo", getDbInfo);
rtGetMongoApi.get("/getusers", dbGetUsers);

// Export the router
export {
  rtGetMongoApi
};
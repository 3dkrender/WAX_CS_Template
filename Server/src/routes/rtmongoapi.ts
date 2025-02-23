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
 * Sample: http://<host>:<port>/api/getdbinfo
 * @returns: {Object} info
 */
rtGetMongoApi.get("/getdbinfo", getDbInfo);

/**
 * GET /api/getusers
 * @description Get all users
 * Sample: http://<host>:<port>/api/getusers
 * @returns: {Array} users
 */
rtGetMongoApi.get("/getusers", dbGetUsers);

// Export the router
export {
  rtGetMongoApi
};
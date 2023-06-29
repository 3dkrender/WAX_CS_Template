import express from "express";
import { 
  getInfo,
  getUserTokens
} from "../controllers";

/**
 * Router definitions for the WAX API
 */
const rtGetWAXApi = express.Router();

/**
 * GET /api/getinfo
 * @description Get blockchain info
 */
rtGetWAXApi.get("/getinfo", getInfo);
rtGetWAXApi.get("/getusertokens/:user", getUserTokens);

// Export the router
export {
  rtGetWAXApi
};

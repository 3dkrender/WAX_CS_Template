import express from "express";
import { 
  getInfo,
  getUserTokens,
  getTableRows
} from "../controllers";

/**
 * Router definitions for the WAX API
 */
const rtGetWAXApi = express.Router();

/**
 * GET /api/getinfo
 * @description Get blockchain info
 * Sample: http://<host>:<port>/api/getinfo
 */
rtGetWAXApi.get("/getinfo", getInfo);

/**
 * GET /api/getusertokens/:user
 * @description Get the tokens owned by a user
 * Sample: http://<host>:<port>/api/getusertokens/<user>
 * @param user: {String} user account name
 * @returns: Promise: {Array} tokens
 */
rtGetWAXApi.get("/getusertokens/:user", getUserTokens);

/**
 * GET /api/get_table_rows/:code/:scope/:table
 * @description Get the content of a table in the blockchain
 * Sample: http://<host>:<port>/api/get_table_rows/<code>/<scope>/<table>
 * @param code: {String} contract account name
 * @param scope: {String} table scope
 * @param table: {String} table name
 * @returns: Promise: {Array} rows
 */
rtGetWAXApi.get("/get_table_rows/:code/:scope/:table", getTableRows);

// Export the router
export {
  rtGetWAXApi
};

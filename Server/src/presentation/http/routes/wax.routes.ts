import { Router } from 'express';
import { WAXController } from '../controllers/WAXController';

const waxRouter = Router();
const waxController = new WAXController();

/**
 * @route GET /api/getinfo
 * @description Get blockchain info
 * @access Public
 */
waxRouter.get('/getinfo', (req, res) => waxController.getInfo(req, res));

/**
 * @route GET /api/getusertokens/:user
 * @description Get user tokens
 * @param {string} user - User account name
 * @access Public
 */
waxRouter.get('/getusertokens/:user', (req, res) => waxController.getUserTokens(req, res));

/**
 * @route GET /api/get_table_rows/:code/:scope/:table
 * @description Get table rows
 * @param {string} code - Contract account name
 * @param {string} scope - Table scope
 * @param {string} table - Table name
 * @query {number} limit - Number of rows to return
 * @query {number} index_position - Index position
 * @query {string} key_type - Key type
 * @query {string} lower_bound - Lower bound
 * @query {string} upper_bound - Upper bound
 * @access Public
 */
waxRouter.get('/get_table_rows/:code/:scope/:table', (req, res) => waxController.getTableRows(req, res));

export default waxRouter; 
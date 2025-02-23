import axios from "axios";
import { logger } from "../config/logger";

export class APIWAXService {
  private API_URL = process.env.RPC as string;
  constructor() { }

  /**
   * Read blockchain info. Only for testing purposes
   * @returns: {Object} info
   */
  public async getInfo() {
    try {
      const info = await axios.get(`${this.API_URL}/v1/chain/get_info`);
      return info;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * Get table rows from a contract
   * @param code: {String} contract account name
   * @param scope: {String} table scope
   * @param table: {String} table name
   * @param limit: {Number} number of rows to ask for in each request (avoid timeouts and API limits)
   * @param index: {Number} index position
   * @param lower_bound: {Number | String} lower bound
   * @param upper_bound: {Number | String} upper bound
   * @returns: Promise: {Array} rows
   */
  public async getTableRows(
    code: string,
    scope: string,
    table: string,
    limit: number = 500,
    index?: number | null,
    lower_bound: number | string = 0,
    upper_bound: number | string = -1
  ) {
    let more = true;
    const result: any[] = [];
    try {
      do {
        const response: any = await axios.get(`${this.API_URL}/v1/chain/get_table_rows`, {
          params: {
            json: true,
            code: code,
            scope: scope,
            table: table,
            limit: limit,
            index_position: index,
            key_type: "i64",
            lower_bound: lower_bound,
            upper_bound: upper_bound,
          }
        });
        const data = response.data;
        result.push(...data.rows);
        lower_bound = data.next_key;
        more = data.more;
      } while (more);
      return result;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * Get the balance of an account
   * @param account: {String} account name
   * @returns: {Number} balance
   */
  public async getUserTokens(account: string) {
    try {
      const response: any = await axios.get(`${this.API_URL}/v2/state/get_tokens`, {
        params: {
          account: account,
        },
      });
      const tokens = response.data.tokens.filter((token: any) => token.amount !== null);
      return tokens;
    } catch (error) {
      logger.error(error);
    }
  }
}

export const apiWAXService = new APIWAXService();
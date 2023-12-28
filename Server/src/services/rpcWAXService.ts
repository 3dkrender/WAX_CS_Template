import { apiWAX, sessionWAX } from './api'
import { logger } from '../config/logger'
import 'isomorphic-fetch'

/**
 * RPC WAX Service Class
 * 
 * This class creates the communication interface with the WAX blockchain API 
 * and defines the functions required by the project to interact with the blockchain.
 */
export class RPCWAXService {

  constructor() {
  }

  /**
   * Read blockchain info. Only for testing purposes
   * @returns: {Object} info
   */
  public async getInfo() {
    try {
      const info = await apiWAX.v1.chain.get_info();
      return info;
    } catch (error) {
      logger.error(error);      
    }
  }

  /**
   * Get the tokens owned by a user
   * @param user: {String} user account name
   * @returns: Promise: {Array} tokens
   */
  public async getUserTokens(user: string) {
    try {
      // WARNING: get_tokens not supported 
      // const data = await this.rpc.get_tokens();
      
      const data = await fetch(`${process.env.RPC}/v2/state/get_tokens?account=${user}`)
        .then((res: any) => res.json())
      if (data.tokens) {
        // purge the tokens array of any tokens with a balance of null
        data.tokens = data.tokens.filter((token: any) => token.amount !== null);
        
        return data.tokens;
      } else {
        return [];
      }
    }
    catch (error) {
      logger.error(error);
    }
  }
  
  /**
   * Get the content of a table in the blockchain
   * @param code: {String} contract account name
   * @param scope: {String} table scope 
   * @param table: {String} table name
   * @returns: Promise: {Array} rows
   */
  public async getTableRows(code: string, scope: string, table: string) {
    try {
      const data = await apiWAX.v1.chain.get_table_rows({
        json: true,
        code,
        scope,
        table,
        limit: 100,
      });
      return data.rows;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * Send a transaction to the blockchain
   * @param wallet: {String} wallet account name
   * @returns {Object} result
   */
  public async sendTransferTo(wallet: string) {
    const action = {
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: process.env.ACCOUNT as string,
        permission: 'active',
      }],
      data: {
        from: process.env.ACCOUNT as string,
        to: wallet,
        quantity: '0.0001 WAX',
        memo: 'This works!',
      },
    }
    try {
      const result = await sessionWAX.transact({action});
      return result;
    } catch (error) {
      logger.error(error);
    }
  }
}

export const rpcWAXService = new RPCWAXService();
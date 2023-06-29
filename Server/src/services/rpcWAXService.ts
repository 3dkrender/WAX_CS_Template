import { JsonRpc } from 'enf-eosjs'
import { api } from './api'
import { logger } from '../config/logger'
import 'isomorphic-fetch'

/**
 * RPC WAX Service Class
 * 
 * This class creates the communication interface with the WAX blockchain API 
 * and defines the functions required by the project to interact with the blockchain.
 */
export class RPCWAXService {
  public rpc: JsonRpc
  public api: any
  public TOPOS  = {
    blocksBehind: 3,
    expireSeconds: 90,
  }

  constructor() {
    this.rpc = new JsonRpc(process.env.RPC || "", { });
    this.api = api(this.rpc);
  }

  /**
   * Read blockchain info. Only for testing purposes
   * @returns: {Object} info
   */
  public async getInfo() {
    try {
      const info = await this.rpc.get_info();
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
    console.log("getUserTokens");
    
    try {
      // WARNING: get_tokens not supported by enf-eosjs
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
}

export const rpcWAXService = new RPCWAXService();
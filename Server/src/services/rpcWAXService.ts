import { sessionWAX } from './api'
import { logger } from '../config/logger'

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
      const result = await sessionWAX.transact({ action });
      return result;
    } catch (error) {
      logger.error(error);
    }
  }
}

export const rpcWAXService = new RPCWAXService();
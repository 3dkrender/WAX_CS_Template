import axios from 'axios';
import { Session } from '@wharfkit/session';
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey';
import { IWAXRepository } from '../../../domain/repositories/IWAXRepository';
import { BlockchainInfo } from '../../../domain/entities/wax/BlockchainInfo';
import { UserTokens } from '../../../domain/entities/wax/Token';
import { TableData, TableQueryParams, TableResponse } from '../../../domain/entities/wax/TableData';
import { CacheService } from '../../persistence/cache/CacheService';

export class WAXRepository implements IWAXRepository {
  private readonly apiUrl: string;
  private readonly session: Session;
  private readonly cache: CacheService;

  constructor() {
    this.apiUrl = process.env.RPC as string;
    this.cache = CacheService.getInstance();
    
    const sessionArgs = {
      chain: {
        id: process.env.CHAIN_ID as string,
        url: this.apiUrl,
      },
      actor: process.env.ACCOUNT as string,
      permission: "active",
      walletPlugin: new WalletPluginPrivateKey(process.env.WAXKEY as string),
    };

    this.session = new Session(sessionArgs);
  }

  async getBlockchainInfo(): Promise<BlockchainInfo> {
    const cacheKey = 'blockchain_info';
    const cachedInfo = this.cache.get<BlockchainInfo>(cacheKey);

    if (cachedInfo) {
      return cachedInfo;
    }

    try {
      const response = await axios.get(`${this.apiUrl}/v1/chain/get_info`);
      this.cache.set(cacheKey, response.data, 5); // Cache for 5 seconds
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get blockchain info: ${error.message}`);
    }
  }

  async getUserTokens(account: string): Promise<UserTokens> {
    const cacheKey = this.cache.generateKey('user_tokens', account);
    const cachedTokens = this.cache.get<UserTokens>(cacheKey);

    if (cachedTokens) {
      return cachedTokens;
    }

    try {
      const response = await axios.get(`${this.apiUrl}/v2/state/get_tokens`, {
        params: { account },
      });
      
      const tokens: UserTokens = {
        account,
        tokens: response.data.tokens.filter((token: any) => token.amount !== null),
      };

      this.cache.set(cacheKey, tokens, 30); // Cache for 30 seconds
      return tokens;
    } catch (error: any) {
      throw new Error(`Failed to get user tokens: ${error.message}`);
    }
  }

  async getTableRows<T = any>(params: TableQueryParams): Promise<TableData<T>> {
    const cacheKey = this.cache.generateKey('table_rows', params);
    const cachedData = this.cache.get<TableData<T>>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const result: T[] = [];
    let more = true;
    let lower_bound = params.lower_bound || 0;

    try {
      do {
        const response = await axios.get(`${this.apiUrl}/v1/chain/get_table_rows`, {
          params: {
            json: true,
            code: params.code,
            scope: params.scope,
            table: params.table,
            limit: params.limit || 500,
            index_position: params.index_position,
            key_type: params.key_type || "i64",
            lower_bound,
            upper_bound: params.upper_bound || -1,
          },
        });

        const data: TableResponse<T> = response.data;
        result.push(...data.rows);
        lower_bound = data.next_key;
        more = data.more;
      } while (more);

      const tableData: TableData<T> = {
        data: {
          rows: result,
          more: false,
          next_key: "",
        },
        params,
      };

      this.cache.set(cacheKey, tableData, 15); // Cache for 15 seconds
      return tableData;
    } catch (error: any) {
      throw new Error(`Failed to get table rows: ${error.message}`);
    }
  }

  async sendTransaction(from: string, to: string, amount: string, memo: string): Promise<any> {
    const action = {
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: from,
        permission: 'active',
      }],
      data: {
        from,
        to,
        quantity: amount,
        memo,
      },
    };

    try {
      const result = await this.session.transact({ action });
      // Invalidate cache for both accounts' tokens
      this.cache.del(this.cache.generateKey('user_tokens', from));
      this.cache.del(this.cache.generateKey('user_tokens', to));
      return result;
    } catch (error: any) {
      throw new Error(`Failed to send transaction: ${error.message}`);
    }
  }
} 
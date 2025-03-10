import { BlockchainInfo } from '../entities/wax/BlockchainInfo';
import { UserTokens } from '../entities/wax/Token';
import { TableData, TableQueryParams } from '../entities/wax/TableData';

export interface IWAXRepository {
  getBlockchainInfo(): Promise<BlockchainInfo>;
  getUserTokens(account: string): Promise<UserTokens>;
  getTableRows<T = any>(params: TableQueryParams): Promise<TableData<T>>;
  sendTransaction(from: string, to: string, amount: string, memo: string): Promise<any>;
} 
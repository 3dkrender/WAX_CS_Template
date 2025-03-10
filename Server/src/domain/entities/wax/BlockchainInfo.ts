export interface BlockchainInfo {
  server_version: string;
  chain_id: string;
  head_block_num: number;
  last_irreversible_block_num: number;
  head_block_time: string;
  head_block_producer: string;
} 
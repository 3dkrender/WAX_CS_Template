export interface TableQueryParams {
  code: string;
  scope: string;
  table: string;
  limit?: number;
  index_position?: number;
  key_type?: string;
  lower_bound?: number | string;
  upper_bound?: number | string;
}

export interface TableResponse<T = any> {
  rows: T[];
  more: boolean;
  next_key: string;
}

export interface TableData<T = any> {
  data: TableResponse<T>;
  params: TableQueryParams;
} 
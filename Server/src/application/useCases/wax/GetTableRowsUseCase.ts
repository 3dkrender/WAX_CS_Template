import { TableData, TableQueryParams } from '../../../domain/entities/wax/TableData';
import { IWAXRepository } from '../../../domain/repositories/IWAXRepository';

export class GetTableRowsUseCase {
  constructor(private readonly waxRepository: IWAXRepository) {}

  async execute<T = any>(params: TableQueryParams): Promise<TableData<T>> {
    if (!params.code || !params.scope || !params.table) {
      throw new Error('Code, scope and table are required');
    }

    try {
      return await this.waxRepository.getTableRows<T>(params);
    } catch (error: any) {
      throw new Error('Error getting table rows: ' + error.message);
    }
  }
} 
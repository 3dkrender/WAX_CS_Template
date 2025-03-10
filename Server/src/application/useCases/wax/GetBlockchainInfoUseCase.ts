import { BlockchainInfo } from '../../../domain/entities/wax/BlockchainInfo';
import { IWAXRepository } from '../../../domain/repositories/IWAXRepository';

export class GetBlockchainInfoUseCase {
  constructor(private readonly waxRepository: IWAXRepository) {}

  async execute(): Promise<BlockchainInfo> {
    try {
      return await this.waxRepository.getBlockchainInfo();
    } catch (error: any) {
      throw new Error('Error getting blockchain info: ' + error.message);
    }
  }
} 
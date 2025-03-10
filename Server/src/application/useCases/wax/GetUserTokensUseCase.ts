import { UserTokens } from '../../../domain/entities/wax/Token';
import { IWAXRepository } from '../../../domain/repositories/IWAXRepository';

export class GetUserTokensUseCase {
  constructor(private readonly waxRepository: IWAXRepository) {}

  async execute(account: string): Promise<UserTokens> {
    if (!account) {
      throw new Error('Account is required');
    }

    try {
      return await this.waxRepository.getUserTokens(account);
    } catch (error: any) {
      throw new Error('Error getting user tokens: ' + error.message);
    }
  }
} 
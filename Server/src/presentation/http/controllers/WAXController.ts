import { Request, Response } from 'express';
import { GetBlockchainInfoUseCase } from '../../../application/useCases/wax/GetBlockchainInfoUseCase';
import { GetUserTokensUseCase } from '../../../application/useCases/wax/GetUserTokensUseCase';
import { GetTableRowsUseCase } from '../../../application/useCases/wax/GetTableRowsUseCase';
import { WAXRepository } from '../../../infrastructure/external/wax/WAXRepository';

export class WAXController {
  private readonly waxRepository: WAXRepository;
  private readonly getBlockchainInfoUseCase: GetBlockchainInfoUseCase;
  private readonly getUserTokensUseCase: GetUserTokensUseCase;
  private readonly getTableRowsUseCase: GetTableRowsUseCase;

  constructor() {
    this.waxRepository = new WAXRepository();
    this.getBlockchainInfoUseCase = new GetBlockchainInfoUseCase(this.waxRepository);
    this.getUserTokensUseCase = new GetUserTokensUseCase(this.waxRepository);
    this.getTableRowsUseCase = new GetTableRowsUseCase(this.waxRepository);
  }

  async getInfo(req: Request, res: Response): Promise<void> {
    try {
      const info = await this.getBlockchainInfoUseCase.execute();
      res.status(200).json(info);
    } catch (error: any) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  async getUserTokens(req: Request, res: Response): Promise<void> {
    try {
      const { user } = req.params;
      const tokens = await this.getUserTokensUseCase.execute(user);
      res.status(200).json(tokens);
    } catch (error: any) {
      res.status(error.message.includes('required') ? 400 : 500).json({
        error: error.message.includes('required') ? 'Bad Request' : 'Internal Server Error',
        message: error.message
      });
    }
  }

  async getTableRows(req: Request, res: Response): Promise<void> {
    try {
      const { code, scope, table } = req.params;
      const { limit, index_position, key_type, lower_bound, upper_bound } = req.query;

      const params = {
        code,
        scope,
        table,
        limit: limit ? parseInt(limit as string) : undefined,
        index_position: index_position ? parseInt(index_position as string) : undefined,
        key_type: key_type as string,
        lower_bound: lower_bound as string,
        upper_bound: upper_bound as string
      };

      const data = await this.getTableRowsUseCase.execute(params);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(error.message.includes('required') ? 400 : 500).json({
        error: error.message.includes('required') ? 'Bad Request' : 'Internal Server Error',
        message: error.message
      });
    }
  }
} 
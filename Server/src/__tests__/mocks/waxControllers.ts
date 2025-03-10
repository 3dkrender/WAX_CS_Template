import { Request, Response } from 'express';

export const mockGetInfo = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    res.status(200).json({
      server_version: "mock_version",
      chain_id: "mock_chain_id",
      head_block_num: 12345678,
      last_irreversible_block_num: 12345677,
      head_block_time: "2024-03-10T12:00:00.000",
      head_block_producer: "mock.producer"
    });
  }
);

export const mockGetUserTokens = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    const { user } = req.params;
    res.status(200).json({
      account: user,
      tokens: [
        {
          symbol: "WAX",
          amount: "100.00000000",
          contract: "eosio.token"
        }
      ]
    });
  }
);

export const mockGetTableRows = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    const { code, scope, table } = req.params;
    res.status(200).json({
      rows: [
        {
          id: 1,
          data: "mock_data"
        }
      ],
      more: false,
      next_key: ""
    });
  }
);

// Mock error cases
export const mockGetInfoError = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch blockchain info"
    });
  }
);

export const mockGetUserTokensError = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    res.status(404).json({
      error: "Not Found",
      message: "User not found"
    });
  }
);

export const mockGetTableRowsError = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    res.status(400).json({
      error: "Bad Request",
      message: "Invalid table parameters"
    });
  }
); 
import { Request, Response } from 'express';

export const mockGetDbInfo = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    res.status(200).json({
      status: "connected",
      version: "mock_version",
      collections: 5,
      documents: 1000
    });
  }
);

export const mockDbGetUsers = jest.fn().mockImplementation(
  (req: Request, res: Response) => {
    res.status(200).json({
      users: [
        {
          id: 1,
          username: "test_user",
          email: "test@example.com"
        }
      ]
    });
  }
); 
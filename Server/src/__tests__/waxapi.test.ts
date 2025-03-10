import request from 'supertest';
import express from 'express';
import { createServer } from '../server';
import * as controllers from '../controllers';
import * as waxMocks from './mocks/waxControllers';
import * as mongoMocks from './mocks/mongoControllers';

// Mock the controllers
jest.mock('../controllers', () => ({
  getInfo: jest.fn(),
  getUserTokens: jest.fn(),
  getTableRows: jest.fn(),
  getDbInfo: jest.fn(),
  dbGetUsers: jest.fn()
}));

describe('WAX API', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = await createServer({ enableMongo: false });
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /api/getinfo', () => {
    it('should return blockchain info successfully', async () => {
      // Setup mock
      (controllers.getInfo as jest.Mock).mockImplementation(waxMocks.mockGetInfo);

      const response = await request(app).get('/api/getinfo');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('server_version');
      expect(response.body).toHaveProperty('chain_id');
      expect(response.body).toHaveProperty('head_block_num');
      expect(controllers.getInfo).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when fetching blockchain info', async () => {
      // Setup mock for error case
      (controllers.getInfo as jest.Mock).mockImplementation(waxMocks.mockGetInfoError);

      const response = await request(app).get('/api/getinfo');
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
      expect(controllers.getInfo).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/getusertokens/:user', () => {
    it('should return user tokens successfully', async () => {
      // Setup mock
      (controllers.getUserTokens as jest.Mock).mockImplementation(waxMocks.mockGetUserTokens);

      const response = await request(app).get('/api/getusertokens/testuser');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('account', 'testuser');
      expect(response.body).toHaveProperty('tokens');
      expect(Array.isArray(response.body.tokens)).toBe(true);
      expect(controllers.getUserTokens).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when user is not found', async () => {
      // Setup mock for error case
      (controllers.getUserTokens as jest.Mock).mockImplementation(waxMocks.mockGetUserTokensError);

      const response = await request(app).get('/api/getusertokens/nonexistentuser');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
      expect(controllers.getUserTokens).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/get_table_rows/:code/:scope/:table', () => {
    it('should return table rows successfully', async () => {
      // Setup mock
      (controllers.getTableRows as jest.Mock).mockImplementation(waxMocks.mockGetTableRows);

      const response = await request(app)
        .get('/api/get_table_rows/test.contract/test.scope/test.table');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('rows');
      expect(Array.isArray(response.body.rows)).toBe(true);
      expect(controllers.getTableRows).toHaveBeenCalledTimes(1);
    });

    it('should handle errors with invalid parameters', async () => {
      // Setup mock for error case
      (controllers.getTableRows as jest.Mock).mockImplementation(waxMocks.mockGetTableRowsError);

      const response = await request(app)
        .get('/api/get_table_rows/invalid/invalid/invalid');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
      expect(controllers.getTableRows).toHaveBeenCalledTimes(1);
    });
  });
}); 
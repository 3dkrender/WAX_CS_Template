import { Db } from 'mongodb';
import { dbConnect } from './mongoConnect';
import { logger } from '../config/logger';

/**
 * Class to manage the database connection
 */
class DbService {
  private db: Db | null = null;

  constructor() {
    this.connect();
  }

  /**
   * Connects to the Mongo database
   */
  private async connect(): Promise<void> {
    this.db = await dbConnect();
    if (this.db) {
      logger.info("Connected to the database");
    } else {
      logger.error("Error connecting to the database");
    }
  }

  /**
   * Get the database connection. Only for testing purposes
   * @returns {Db | null} Mongo database connection | null
   */
  public getDb(): Db | null {
    return this.db;
  }

  /**
   * Reads and returns a list of users from the database (sample use case)
   * @returns {Promise<any>} Users collection
   */
  public async getUsers(): Promise<any> {
    if (this.db) {
      return await this.db.collection('users').find().toArray();
    } else {
      logger.error("Error getting users");
      return null;
    }
  }
}

export const dbService = new DbService();
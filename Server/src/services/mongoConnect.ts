import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import { logger } from '../config/logger';

/**
 * Connects to the Mongo database
 * @returns {Promise<Db>} Mongo database connection | null
 */
export const dbConnect = async (): Promise<Db | null> => {
  try {
    const options: MongoClientOptions = {
      useUnifiedTopology: true,
      maxPoolSize: 200,
    } as MongoClientOptions;
  
    const mClient = new MongoClient(process.env.MONGO_URI || "", options);
    const client = await mClient.connect();
    const db = client.db(process.env.MONGO_DBNAME || "");
    return db;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
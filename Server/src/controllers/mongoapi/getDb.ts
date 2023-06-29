import { dbService } from "../../services/dbService";

/**
 * Get Database Info controller
 * @param req
 * @param res 
 */
export const getDbInfo = (req: any, res: any) => {
  try {
    const info = dbService.getDb();
    if (info) {
      res.status(200).json({
        sucess: 'Database connected',
      });
    } else {
      res.status(500).json({
        error: 'Database not connected',
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });    
  }
}
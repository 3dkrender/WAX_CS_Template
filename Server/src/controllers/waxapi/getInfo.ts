import { apiWAXService } from "../../services/apiWAXService";

/**
 * getInfo controller
 * @param req
 * @param res 
 */
export const getInfo = async (req: any, res: any) => {
  try {
    const info = await apiWAXService.getInfo();
    res.status(200).json({
      info,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });    
  }
}
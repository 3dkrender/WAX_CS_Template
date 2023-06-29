import { rpcWAXService } from "../../services/rpcWAXService"; 

/**
 * getUserTokens controller
 * @param req
 * @param res 
 */
export const getUserTokens = async (req: any, res: any) => {
  try {
    const tokens = await rpcWAXService.getUserTokens(req.params.user);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({
      error,
    });    
  }
}
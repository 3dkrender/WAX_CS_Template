import { dbService } from "../../services/dbService";

export const dbGetUsers = async (req: any, res: any) => {
  try {
    const users = await dbService.getUsers();
    if (users) {
      res.status(200).json({
        sucess: 'Users retrieved',
        users,
      });
    } else {
      res.status(500).json({
        error: 'Error retrieving users',
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });    
  }
}
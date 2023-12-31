import { getInfo } from "./waxapi/getInfo";
import { getUserTokens } from "./waxapi/getUserTokens";
import { getTableRows } from "./waxapi/getTableRows";
import { getDbInfo } from "./mongoapi/getDb";
import { dbGetUsers } from "./mongoapi/getUsers";

// Export the controllers
export {
  getInfo,
  getUserTokens,
  getTableRows,
  getDbInfo,
  dbGetUsers,
}
import { combineReducers } from "redux";
import user from "./userReducer";

/**
 * Combine all the reducers of the app
 */
export const rootReducer = combineReducers({
  user
});

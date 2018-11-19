import { combineReducers } from "redux";
import tweets from "./tweets";
import users from "./users";
import authUser from "./authUser";

/**
 * Root reducer
 * @param tweets
 * @param users
 * @param authUser
 */
export default combineReducers({
  tweets,
  users,
  authUser
});

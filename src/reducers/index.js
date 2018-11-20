import { combineReducers } from "redux";
import tweets from "./tweets";
import users from "./users";
import authUser from "./authUser";
import { loadingBarReducer } from "react-redux-loading-bar";

/**
 * Root reducer
 * @param tweets
 * @param users
 * @param authUser
 */
export default combineReducers({
  tweets,
  users,
  authUser,
  loadingBar: loadingBarReducer
});

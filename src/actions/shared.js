import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthUser } from "./authUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

//Temp auth id
const AUTH_ID = "tylermcginnis";

/**
 * Loads the initial data
 * @return {function(*): (void|PromiseLike<T | never>|Promise<T | never>)}
 */
export const handleInitialData = () => dispatch => {
  //show loading bar
  dispatch(showLoading());
  return (
    //redux thunk pattern to make async request
    getInitialData()
      //returns promise with users & tweets properties
      .then(({ users, tweets }) => {
        //now we want to add users, tweets & authUser to our redux store using the dispatch method
        dispatch(receiveUsers(users));
        dispatch(receiveTweets(tweets));
        dispatch(setAuthUser(AUTH_ID));
        dispatch(hideLoading());
      })
  );
};

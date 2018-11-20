import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthUser } from "./authUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { toast } from "react-toastify";

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

/**
 * Toast notification
 * @param content {string} Text content the notification should display
 * @param type {string} The type of notification.  Accepts: "default", "success", "info", "warning", "error"
 * @param className {string} Container css class name
 * @param progressClassName {string} Progress bar css class name
 * @param autoClose {number} Time delay in ms before the toast closes
 */
export const handleNotification = (
  content,
  type = "default",
  className = "alert-primary",
  progressClassName = "bg-primary",
  autoClose = 1500
) => {
  toast(content, {
    type,
    className: `alert ${className}`,
    progressClassName,
    autoClose
  });
};

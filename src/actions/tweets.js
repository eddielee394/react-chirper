import { saveLikeToggle, saveTweet } from "../utils/api";
import { handleNotification } from "./shared";
import { hideLoading, showLoading } from "react-redux-loading-bar";

/**
 * Receive Tweets Action Type
 * @summary Action Type
 * @type {string}
 */
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";

/**
 * Toggle Tweet Action Type
 * @summary Action Type
 * @type {string}
 */
export const TOGGLE_TWEET = "TOGGLE_TWEET";

/**
 * Add Tweet Action Type
 * @summary action type
 * @type {string}
 */
export const ADD_TWEET = "ADD_TWEET";

/**
 * Create Receive Tweets Action
 * @summary action creator
 * @param tweets
 * @return {{type: string, tweets: *}}
 */
export const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

/**
 * Toggle Tweet Action
 * @param id
 * @param authUser
 * @param hasLiked
 * @return {{type: string, id: *, authUser: *, hasLiked: *}}
 */
const toggleTweet = ({ id, authUser, hasLiked }) => ({
  type: TOGGLE_TWEET,
  id,
  authUser,
  hasLiked
});

/**
 * Add Tweet Action
 * @summary action creator
 * @param tweet
 * @return {{type: string, tweet: *}}
 */
const addTweet = tweet => ({
  type: ADD_TWEET,
  tweet
});

/**
 * Handle Toggle Tweet Acton Creator
 * @param info {object} id | authUser | hasLiked
 * @return {function(*): Promise<T | never>}
 */
export const handleToggleTweet = info => dispatch => {
  dispatch(toggleTweet(info));
  return saveLikeToggle(info).catch(event => {
    console.warn("Error in handleToggleTweet: ", event);
    dispatch(toggleTweet(info));
    handleNotification(
      "There was an error liking the tweet.  Try again.",
      "error",
      "alert-danger"
    );
  });
};

/**
 * Handle Add Tweet action creator
 * @summary action creator
 * @param text
 * @param replyingTo
 * @return {function(*, *): Promise<T | never>}
 */
export const handleAddTweet = (text, replyingTo) => (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(showLoading());
  return saveTweet({
    text,
    author: authUser,
    replyingTo
  })
    .then(tweet => dispatch(addTweet(tweet)))
    .then(() => {
      dispatch(hideLoading());
      handleNotification(
        "Your tweet was successfully added.",
        "success",
        "alert-success"
      );
    })
    .catch(event => {
      console.warn("Error in handleAddTweet: ", event);
      handleNotification(
        "There was an error adding the tweet.  Try again.",
        "error",
        "alert-danger"
      );
    });
};

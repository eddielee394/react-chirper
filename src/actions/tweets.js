import { saveLikeToggle, saveTweet } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { toast } from "react-toastify";

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
    toast("There was an error liking the tweet.  Try again.", {
      type: "error",
      className: "alert-danger"
    });
  });
};

/**
 * Handle Add Tweet action creator
 * @summary action creator
 * @param text
 * @param replyingTo
 * @param callback
 * @return {function(*, *): Promise<T | never>}
 */
export const handleAddTweet = (text, replyingTo, callback = null) => (
  dispatch,
  getState
) => {
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
      toast("Your tweet was successfully added", {
        type: "success",
        className: "alert-success",
        onClose: callback
      });
    })
    .catch(event => {
      console.warn("Error in handleAddTweet: ", event);
      toast("There was an error adding the tweet.  Try again.", {
        type: "error",
        className: "alert-danger"
      });
    });
};

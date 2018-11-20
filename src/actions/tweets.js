import { saveLikeToggle } from "../utils/api";
import { handleNotification } from "./shared";

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

/**
 * Receive Tweets Action Type
 * @summary Action Type
 * @type {string}
 */
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";

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

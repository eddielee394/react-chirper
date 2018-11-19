import { RECEIVE_TWEETS } from "../actions/tweets";

/**
 * Tweets reducer
 * @param state
 * @param action
 * @return {{}}
 */
const tweets = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        //receive the state
        ...state,
        //merge the action tweets
        ...action.tweets
      };
    default:
      return state;
  }
};

export default tweets;

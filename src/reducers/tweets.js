import { RECEIVE_TWEETS, TOGGLE_TWEET } from "../actions/tweets";

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
    case TOGGLE_TWEET:
      //return a new object
      return {
        //spread the prev tweets on the object
        ...state,
        //create new object using the id of the tweet being passed
        [action.id]: {
          //spread the properties of the old tweet object on to the new one
          ...state[action.id],
          //if they already liked it remove them from the state, otherwise add the auth user to the state's likes array
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(uid => uid !== action.authUser)
              : state[action.id].likes.concat(action.authUser)
        }
      };

    default:
      return state;
  }
};

export default tweets;

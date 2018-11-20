import { ADD_TWEET, RECEIVE_TWEETS, TOGGLE_TWEET } from "../actions/tweets";

/**
 * Tweets reducer
 * @param state
 * @param action RECEIVE_TWEETS | TOGGLE_TWEET | ADD_TWEET
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
    case ADD_TWEET:
      //get the tweet from the action
      const { tweet } = action;
      //create an empty object for replyingTo so we can use it later
      let replyingTo = {};
      //check if replyingTo exists or not
      if (tweet.replyingTo !== null) {
        //if so, update the replyingTo object
        replyingTo = {
          //with a new state object of the replyingTo value from the action
          [tweet.replyingTo]: {
            //then spread the prev state
            ...state[tweet.replyingTo],
            //and update the replies property with the new tweet id
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        };
      }
      //now we can return a new object so we're not modifying the original state
      return {
        //spread the old state onto the new object
        ...state,
        //create a new object with the tweet and replyingTo object from earlier being passed & add to the tweet state
        [action.tweet.id]: action.tweet,
        ...replyingTo
      };

    default:
      return state;
  }
};

export default tweets;

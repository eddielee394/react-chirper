import { RECEIVE_USERS } from "../actions/users";

/**
 * Users reducer
 * @summary reducer
 * @param state
 * @param action
 * @return {{}}
 */
const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        //return new state of users
        ...state,
        //and all users from the action
        ...action.users
      };
    default:
      return state;
  }
};

export default users;

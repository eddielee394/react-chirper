/**
 * SET_AUTH_USER Action Type
 * @summary action type
 * @type {string}
 */
export const SET_AUTH_USER = "SET_AUTH_USER";

/**
 * Set the Auth User
 * @summary action creator
 * @param id
 * @return {{type: string, id: *}}
 */
export const setAuthUser = id => ({
  type: SET_AUTH_USER,
  id
});

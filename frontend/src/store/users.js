import { SET_CURRENT_USER } from './session.js';
import { GET_POSTS } from './posts.js';
import { createSelector } from 'reselect';

const selectUsers = (state) => state.users || {};

export const selectUsersArray = createSelector(
  [selectUsers],
  (users) => Object.values(users)
);

const usersReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        if (action.payload) {
          return { ...state, [action.payload.id]: action.payload };
        } else {
          return {};
        }
      case GET_POSTS:
         return { ...state, ...action.payload.users}
      default:
        return state;
    }
  };
  
export default usersReducer;
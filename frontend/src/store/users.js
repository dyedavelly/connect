import { SET_CURRENT_USER } from './session.js';
import { GET_POSTS } from './posts.js';

export const selectUsersArray = (state) => { return Object.values(state.users || {}) }

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
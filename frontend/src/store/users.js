import { SET_CURRENT_USER } from './session.js';


const usersReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        if (action.payload) {
          return { ...state, [action.payload.id]: action.payload };
        } else {
          return {};
        }
      default:
        return state;
    }
  };
  
export default usersReducer;
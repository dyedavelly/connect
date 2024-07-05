import csrfFetch from "./csrf.js";
import { createSelector } from 'reselect';

export const GET_COMMENTS = 'comments/GET_COMMENTS';
export const GET_COMMENT = 'comments/GET_COMMENT';
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

// Action Creators
export const getComments = (payload) => ({
    type: GET_COMMENTS,
    payload
});

const getComment = (comment) => ({
    type: GET_COMMENT,
    comment
});

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
});

const selectComments = (state) => state.comments || {}

export const selectCommentsArray = createSelector(
    [selectComments],
    (comments) => Object.values(comments)
);

const commentsReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case GET_COMMENTS:
            return {...state, ...action.payload.comments};
        default:
            return state;
    }
}

export default commentsReducer;
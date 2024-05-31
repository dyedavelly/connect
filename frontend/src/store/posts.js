import csrfFetch from "./csrf.js";

export const GET_POSTS = 'posts/GET_POSTS';

// Action Creators
const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
});

export const selectPostsArray = (state) => { return Object.values(state.posts || {}) }

export const fetchPosts = () => async (dispatch) => {
    const response = await csrfFetch('/api/posts');

    if (response.ok) {
        const data = await response.json();
        dispatch(getPosts(data));
        return data;  // Return the fetched data
    } else {
        console.error('Failed to fetch posts:', response.statusText);
        return null;  // Return null in case of an error
    }
}

const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, ...action.posts};
        default:
            return state;
    }
}

export default postsReducer;
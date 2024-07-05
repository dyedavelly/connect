import csrfFetch from "./csrf.js";
import { createSelector } from 'reselect';
import { getComments } from "./comments.js";

export const GET_POSTS = 'posts/GET_POSTS';
export const GET_POST = 'posts/GET_POST';
export const REMOVE_POST = 'posts/REMOVE_POST';


// Action Creators
const getPosts = (payload) => ({
    type: GET_POSTS,
    payload
});

const getPost = (post) => ({
    type: GET_POST,
    post
});

const removePost = (postId) => ({
    type: REMOVE_POST,
    postId
});

const selectPosts = (state) => state.posts || {}

export const selectPostsArray = createSelector(
    [selectPosts],
    (posts) => Object.values(posts)
);

export const selectPost = (postId) => (state) => { return state.posts[postId] || null }

export const fetchPosts = () => async (dispatch) => {
    const response = await csrfFetch('/api/posts');

    if (response.ok) {
        const data = await response.json();
        dispatch(getPosts(data));
        dispatch(getComments(data));
        return data;  // Return the fetched data
    } else {
        console.error('Failed to fetch posts:', response.statusText);
        return null;  // Return null in case of an error
    }
}

export const createPost = (post) => async (dispatch) => {
    const response = await csrfFetch('/api/posts', { 
        method: 'POST',
        body: JSON.stringify(post) ,
        headers: {
            'Content-Type': 'application/json'
        } 
    } );

    if(response.ok){
        const data = await response.json();
        dispatch(getPost(data));
        return data;
    }
}

export const updatePost = (post) => async (dispatch) => {
    console.log(post);
    console.log(post.body);
    const response = await csrfFetch(`/api/posts/${post.id}`, { 
        method: 'PATCH',
        body: JSON.stringify(post) ,
        headers: {
            'Content-Type': 'application/json'
        } 
    } );

    if(response.ok){
        const data = await response.json();
        dispatch(getPost(data));
    }
}

export const deletePost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        } 
    } );

    if(response.ok){
        dispatch(removePost(postId));
        return postId;
    }
}


const postsReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case GET_POSTS:
            return { ...state, ...action.payload.posts};
        case GET_POST:
            return {...state, [action.post.post.id]: action.post.post}
        case REMOVE_POST:
            delete nextState[action.postId];
            return nextState;
        default:
            return state;
    }
}

export default postsReducer;
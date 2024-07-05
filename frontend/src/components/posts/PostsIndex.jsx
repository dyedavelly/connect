import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as postActions from '../../store/posts';
import PostIndexItem from './PostIndexItem';
import { Navigate } from 'react-router-dom';

function PostsIndex() {
    const sessionUser = useSelector(state => state.session.currentUserId);
    
    const dispatch = useDispatch();
    const posts = useSelector(postActions.selectPostsArray);
   

    useEffect(() => {
        dispatch(postActions.fetchPosts());
    }, [dispatch]);

    if (!sessionUser) return <Navigate to="/" replace={true} />;

    return(
        <>
            {posts.map((post) => <PostIndexItem post={post} key={post.id}/>)}
        </>
    );

}

export default PostsIndex;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as postActions from '../../store/posts';
import PostIndexItem from './PostIndexItem';

function PostsIndex() {
    const dispatch = useDispatch();
    const posts = useSelector(postActions.selectPostsArray);

    useEffect(() => {
        dispatch(postActions.fetchPosts());
      }, [dispatch]);

    return(
        <>
            {posts.map((post) => <PostIndexItem post={post} />)}
        </>
    );

}

export default PostsIndex;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as postActions from '../../store/posts';

function PostsIndex() {
    const dispatch = useDispatch();
    const posts = useSelector(postActions.selectPostsArray);

    useEffect(() => {
        dispatch(postActions.fetchPosts());
      }, [dispatch]);

    return(
        <>
        </>
    );

}

export default PostsIndex;
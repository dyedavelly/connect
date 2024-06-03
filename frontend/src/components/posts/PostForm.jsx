// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import * as postActions from '../../store/posts';
import './PostForm.scss';



function PostForm() {
    // const dispatch = useDispatch();
    // const { postId } = useParams();
    // const post = useSelector(postActions.selectPost(postId));
    //const [body, setBody] = useState(postId ? post.body : '');

    return(
        <>
        <div className="post-container">
          <button className="post-button">Start a post</button>
        </div>
        </>
    )
}

export default PostForm;
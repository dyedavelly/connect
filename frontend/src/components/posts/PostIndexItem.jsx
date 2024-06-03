import { useSelector } from "react-redux";
import * as userActions from '../../store/users';


function PostIndexItem({ post }){
    const users = useSelector(userActions.selectUsersArray);
    const author = users.find(({ id }) => id === post.authorId)
    return (
        <div className="post-box"> 
            <div>
                <span>{author.firstName}  {author.lastName}</span>
            </div>
            <div>{post.body}</div>
        </div>
    )
}

export default PostIndexItem;
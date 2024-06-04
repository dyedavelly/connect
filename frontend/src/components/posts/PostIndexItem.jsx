import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import * as userActions from '../../store/users';
import { FiMoreHorizontal } from "react-icons/fi";
import * as postActions from '../../store/session';


function PostIndexItem({ post }){
    const dispatch = useDispatch();
    const users = useSelector(userActions.selectUsersArray);
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);
    const author = users.find(({ id }) => id === post.authorId);
   

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    const deletePost = () => {
        dispatch(postActions.deletePost());
    };

    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
    
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);
    
    return (
        <div className="post-box"> 
            <div className="post-name-and-menu">
                <span className="author-name">{author.firstName}  {author.lastName}</span>
                <button onClick={toggleMenu} className="horizontal-menu"><FiMoreHorizontal /></button>
                {showMenu && (
                <ul className="post-dropdown" ref={dropdownRef}>
                <li>
                    <button>Edit</button>
                </li>
                <li>
                    <button onClick={deletePost}>Delete</button>
                </li>
                </ul>
            )}
            </div>
            <div className="post-body">{post.body}</div>
        </div>
    )
}

export default PostIndexItem;
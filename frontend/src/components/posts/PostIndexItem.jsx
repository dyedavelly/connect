import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import * as userActions from '../../store/users';
import * as commentActions from '../../store/comments';
import { FiMoreHorizontal } from "react-icons/fi";
import * as postActions from '../../store/posts';
import { FaUserCircle } from 'react-icons/fa';

function PostIndexItem({ post }){
    const dispatch = useDispatch();
    const users = useSelector(userActions.selectUsersArray);
    const comments = useSelector(commentActions.selectCommentsArray);
    const [showMenu, setShowMenu] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [body, setBody] = useState(post.body);
    const dropdownRef = useRef(null);
    const author = users.find(({ id }) => id === post.authorId);
    const sessionUser = useSelector(state => state.session.currentUserId); 

    const closeModal = () => {
        setEditMode(false);
    };

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    const editPost = () => {
        setEditMode(true);
    };

    const updatePost = () => {
        post.body = body;
        dispatch(postActions.updatePost(post));
        closeModal();
    };

    const deletePost = () => {
        const id = post.id;
        dispatch(postActions.deletePost(id));
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
        <>
        {!isEditMode && (
            <div className="post-box"> 
                <div className="post-name-and-menu">
                    <div className="photo-and-name">
                    {author?.photoUrl ? (
                    <img className="profile-photo" src={author.photoUrl}/>
                     ) : (<span className="profile-icon"><FaUserCircle /></span>
                     )}
                    <span className="author-name">{author.firstName} {author.lastName}</span>
                    </div>
                    <div className="post-body">{post.body}</div>
                    {post?.imageUrl ? (
                        <img className="post-image" src={post.imageUrl} />
                    ) : null }   
                   </div>
                   {/* <div className="post-comment">Comment</div> */}
                <div>
                    {author.id === sessionUser && (
                            <>
                            {!showMenu && (
                                <button onClick={toggleMenu} className="horizontal-menu"><FiMoreHorizontal /></button>
                            )}
                            {showMenu && (
                                <ul className="post-dropdown" ref={dropdownRef}>
                                    <li>
                                        <button onClick={editPost}>Edit</button>
                                    </li>
                                    <li>
                                        <button onClick={deletePost}>Delete</button>
                                    </li>
                                </ul>
                            )}
                            </>
                        )}
                </div>
            </div>
        )}
        {isEditMode && (
            <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <span className="modal-header-name-photo">
                                {author?.photoUrl ? (
                                <img className="start-post-profile-photo" src={author.photoUrl}/>
                                ) : (<span className="start-post-profile-icon"><FaUserCircle /></span>
                                )}
                                <span className="modal-name">{author.firstName} {author.lastName.charAt(0)}</span>
                            </span>
                            <button className="close-button" onClick={closeModal}>X</button>
                        </div>
                        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <div className="bottom-border"></div>
                        <div className="modal-post-button">
                        <button onClick={updatePost} className="post-submit-button">Save</button>
                        </div>  
                    </div>
            </div>
        )}
        </>
    );
}

export default PostIndexItem;

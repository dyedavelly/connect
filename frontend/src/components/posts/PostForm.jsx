import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PostForm.scss';
import PostsIndex from './PostsIndex';
import * as postActions from '../../store/posts';
import * as userActions from '../../store/users';
import { FaUserCircle } from 'react-icons/fa';

function PostForm() {
    const dispatch = useDispatch();
    const users = useSelector(userActions.selectUsersArray);
    const sessionUser = useSelector(state => state.session.currentUserId);
    const author = users.find(({ id }) => id === sessionUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [body, setBody] = useState("");
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const createPost = () => {
       dispatch(postActions.createPost({ body }));
       closeModal();
    }

    return (
        <>
            <div className="post-container">
                <div className="post-box">
                {author?.photoUrl ? (
                    <img className="start-post-profile-photo" src={author.photoUrl}/>
                     ) : (<span className="start-post-profile-icon"><FaUserCircle /></span>
                     )}
                   <button className="start-post-button" onClick={openModal}>Start a post</button>
                </div>
                <PostsIndex/>
            </div>
            {isModalOpen && (
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
                        <textarea placeholder="what do you want to talk about?" onChange={(e) => setBody(e.target.value)}></textarea>
                        <div className="bottom-border"></div>
                        <div className="modal-post-button">
                        <button onClick={createPost} className="post-submit-button">Post</button>
                        </div> 
                    </div>
                </div>
            )}
        </>
    );
}

export default PostForm;

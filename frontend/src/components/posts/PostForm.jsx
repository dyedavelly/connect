import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './PostForm.scss';
import PostsIndex from './PostsIndex';
import * as postActions from '../../store/posts';

function PostForm() {
    const dispatch = useDispatch();
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
                   <button className="post-button" onClick={openModal}>Start a post</button>
                </div>
                <PostsIndex/>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={closeModal}>X</button>
                        <textarea placeholder="what do you want to talk about?" onChange={(e) => setBody(e.target.value)}></textarea>
                        <button onClick={createPost} className="post-submit-button">Post</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostForm;

import React, { useState } from 'react';
import './PostForm.scss';

function PostForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="post-container">
                <button className="post-button" onClick={openModal}>Start a post</button>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={closeModal}>X</button>
                        <textarea placeholder="what do you want to talk about?"></textarea>
                        <button className="post-submit-button">Post</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostForm;

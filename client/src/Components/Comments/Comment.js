import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import moment from 'moment';
import { FaRegHeart } from "react-icons/fa";

export const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const {currentUser} = useSelector((state) => state.user);

    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await fetch(`/api/user/${comment.userId}`);
            const data = await res.json();
            if (res.ok) {
              setUser(data);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        getUser();
      }, [comment]);

      const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
      };
    
      const handleSave = async () => {
        try {
          const res = await fetch(`/api/comment/editComment/${comment._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: editedContent,
            }),
          });
          if (res.ok) {
            setIsEditing(false);
            onEdit(comment, editedContent);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

  return (
    <section className='comment'>
        <div className='commenterProtrait'>
            <img src={user.profileImageURL} alt={user.username} />
        </div>
        <div>
            <div>
                <span>{user ? `@${user.username}` : 'account deleted'}</span>
                <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
            {isEditing ? (
                <>
                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    <div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={setIsEditing(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p>{comment.content}</p>
                    <div>
                        <button onClick={() => onLike(comment._id)}>
                            <FaRegHeart />
                        </button>
                        <p>
                            {comment.numberOfLikes > 0 &&
                            comment.numberOfLikes +
                                ' ' +
                                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                        </p>
                        {currentUser && (currentUser._id === comment.userId) && (
                            <>
                            <button type='button' onClick={handleEdit}>
                              Edit
                            </button>
                            <button type='button' onClick={() => onDelete(comment._id)}>
                              Delete
                            </button>
                          </>
                        )}
                    </div>
                </>
            )}
        </div>
    </section>
  )
}

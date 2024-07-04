import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import "./CommentSection.css";

import { Comment } from './Comment.js';
import portrait from '../../Assets/images/portrait.jpg'

export const CommentSection = ({postId}) => {
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.user);

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/get/${postId}`);

                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getComments();
    }, [postId]);

    useEffect(() => {
      if (showModal) {
          document.getElementById("myModal").style.display = "block";
      } else {
          document.getElementById("myModal").style.display = "none";
      }
  }, [showModal]);

    const handleLike = async (commentId) => {
        try {
          if (!currentUser) {
            navigate('/login');
            return;
          }
          const res = await fetch(`/api/comment/like/${commentId}`, {
            method: 'PUT',
          });
          if (res.ok) {
            const data = await res.json();
            setComments(
              comments.map((comment) =>
                comment._id === commentId
                  ? {
                      ...comment,
                      likes: data.likes,
                      numberOfLikes: data.likes.length,
                    }
                  : comment
              )
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const handleEdit = async (comment, editedContent) => {
        setComments(
          comments.map((c) =>
            c._id === comment._id ? { ...c, content: editedContent } : c
          )
        );
      };
    
      const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
          if (!currentUser) {
            navigate('/login');
            return;
          }
          const res = await fetch(`/api/comment/delete/${commentId}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            await res.json();
            setComments(comments.filter((comment) => comment._id !== commentId));
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.length > 200) {
          return;
        }
        try {
          const res = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: content,
              postId,
              userId: currentUser._id,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            setContent('');
            setErrorMessage(null);
            setComments([data, ...comments]);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
    

    
  return (
    <>
        <div className='commentSection'>
          <hr/>
          <h1>Comment</h1>
            {currentUser ? (
                <div className='signedin'>
                    <p>You are now signed in as: </p>
                    <img src={currentUser.coverImage || portrait} alt='' />
                    <Link to={'/account'} className='link'>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
            <div className='notsignedin'>
              <p>You need to sign in before posting comments</p>
              <Link to={'/login'} className='link'>Sign in</Link>
            </div>
            )}

            {currentUser && (
                <form onSubmit={handleSubmit} className='commentForm'>
                    <textarea rows={3} maxLength={200} onChange={(e) => setContent(e.target.value)} 
                    placeholder='new comment...' value={content}/>
                    <div className='footer'>
                        <p>{200 - content.length} characters remaining</p>
                        <button type='submit'>Submit</button>
                    </div>
                    {errorMessage && (<span className='alert'>{errorMessage}</span>)}
                </form>
            )}

            {comments.length > 0 ? (
                <div className='allComments'>
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} 
                        onLike={handleLike} onEdit={handleEdit} onDelete={(commentId) => {
                            setShowModal(true);
                            setCommentToDelete(commentId);
                          }}
                          />
                    ))}
                </div>
            ) : (<p>No comments yet </p>)}
        </div>
        <div id="myModal" className="modal">
            <div className="modal-content">
                <p>Are you sure you want to delete this comment?</p>
                <button className='delete' onClick={() => handleDelete(commentToDelete)}>Yes, I'm sure</button>
                <button className="close" onClick={() => setShowModal(false)}>No, take me back</button>
            </div>
        </div>
    </>
  )
}

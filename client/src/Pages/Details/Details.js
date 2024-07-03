import React, { useEffect, useState } from 'react'
import './Details.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { blog } from '../../Assets/data/data.js'
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from 'react-icons/ai';

import { useSelector } from 'react-redux';
import { CommentSection } from '../../Components/Comments/CommentSection';

export const Details = () => {
    const {postId} = useParams();

    const [Post, setPost] = useState([]);
    const [errorMessgae, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleDelete = async () => {
        setShowModal(false);

        try {
            const res = await fetch(`/api/post/deletePost/${postId}/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = res.json();
            if (!res.ok) {
                setErrorMessage(data.message);
            } else {
                navigate('/Blog');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`/api/post/getPosts?postId=${postId}`, {});
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                return;
            }
            if (res.ok) {
                setPost(data.posts[0]);
            }
        };
        
        fetchPost();
    }, [postId]);

    useEffect(() => {
        if (showModal) {
            document.getElementById("myModal").style.display = "block";
        } else {
            document.getElementById("myModal").style.display = "none";
        }
    }, [showModal])

  return (
    <>
        <section className='singlePost'>
            <div className='container'>
                <div className='left'>
                    <img src={Post.coverImage} alt='' />
                </div>
                <div className='right'>
                    {currentUser && Post.userId === currentUser._id ? (
                        <div className='buttons'>
                        {/* "update content" button */}
                        <Link to={`/edit/${postId}`}>
                            <button className='button'>
                                <BsPencilSquare />
                            </button>
                        </Link>

                        {/* "delete blog" button */}
                        <button className='button' onClick={() => setShowModal(true)}>
                            <AiOutlineDelete />
                        </button>
                    </div>
                    ) : null}
        
                    <h1>{Post.title}</h1>
                    <p> {Post.content} </p>
                </div>
                <CommentSection postId={postId} />
            </div>

            {errorMessgae && (<span className='alert'>{errorMessgae}</span>)}

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <p>Are you sure you want to delete this post?</p>
                    <button className='delete' onClick={handleDelete}>Yes, I'm sure</button>
                    <button className="close" onClick={() => setShowModal(false)}>No, take me back</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Details;
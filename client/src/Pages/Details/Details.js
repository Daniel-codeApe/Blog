import React, { useEffect, useState } from 'react'
import './Details.css'
import { Link, useParams } from 'react-router-dom'
// import { blog } from '../../Assets/data/data.js'
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from 'react-icons/ai';

export const Details = () => {
    const {postId} = useParams();

    const [Post, setPost] = useState([]);

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

  return (
    <>
    {Post? (
        <section className='singlePost'>
            <div className='container'>
                <div className='left'>
                    <img src={Post.coverImage} alt='' />
                </div>
                <div className='right'>
                    <div className='buttons'>
                        {/* "update content" button */}
                        <Link to={`/edit/${postId}`}>
                            <button className='button'>
                                <BsPencilSquare />
                            </button>
                        </Link>

                        {/* "delete blog" button */}
                        <button className='button'>
                            <AiOutlineDelete />
                        </button>
                    </div>
                    <h1>{Post.title}</h1>
                    <p> {Post.content} </p>
                </div>
            </div>
        </section>): null}
    </>
  )
}

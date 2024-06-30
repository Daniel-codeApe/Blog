import React, { useEffect, useState } from 'react';
import './Blog.css';
import { blog } from '../../Assets/data/data.js';
import { AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineTags } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export const Card = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getPosts', {});
                const { posts } = await res.json(); // Extract posts array
                setPosts(posts); // Set the posts state to the array
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPosts();
    }, []);

    // console.log(posts);
    // console.log(Array.isArray(posts));
  return (
    <>
        <section className='blog'>
            <div className='container grid3'>
                {posts.map((item) => (
                    <div className='box boxitems' key={item._id}>
                        <div className='img'>
                            {/* link to the detail page when click on the title */}
                            <Link to={`/details/${item._id}`}>
                                <img src={item.coverImage} alt='cover' />
                            </Link>
                        </div>
                        <div className='details'>
                            <div className='tags'>
                                <AiOutlineTags className='icon' />
                                {/* Make a link for every blog card's category, suppose to lead to 
                                a page the includes every blog within that category */}
                                <a href='/'>#{item.category}</a>
                            </div>
                            {/* link to the detail page when click on the title */}
                            <Link to={`/details/${item._id}`} className='link'>
                                <h3>{item.title}</h3>
                            </Link>
                            <p>{item.content.slice(0, 180)} ...</p>
                            {/* Icons for created date, number of comments, and share */}
                            <div className='date'>
                                <AiOutlineClockCircle className='icon' /> <label>{item.updatedAt}</label>
                                <AiOutlineComment className='icon' /> <label>27</label>
                                <AiOutlineShareAlt className='icon' /> <label>SHARE</label>
                            </div>
                        </div>
                </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default Card

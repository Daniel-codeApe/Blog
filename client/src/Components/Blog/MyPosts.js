import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Blog.css';

import { AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineTags } from "react-icons/ai";
import { Link } from 'react-router-dom';

export const MyPosts = () => {

    const {currentUser} = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`, {});
                const {posts} = await res.json();
                setUserPosts(posts);
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchUserPosts();
    }, [currentUser._id]);

  return (
    <>
        <section className='blog'>
            <div className='container grid3'>
                {Array.isArray(userPosts) ? (userPosts.map((item) => (
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
                                <AiOutlineClockCircle className='icon' /> <label>{new Date(item.updatedAt).toLocaleDateString()}</label>
                                <AiOutlineComment className='icon' /> <label>27</label>
                                <AiOutlineShareAlt className='icon' /> <label>SHARE</label>
                            </div>
                        </div>
                </div>
                ))) : (<div>post unavaliable</div>)}
            </div>
        </section>
    </>
  )
}

export default MyPosts;
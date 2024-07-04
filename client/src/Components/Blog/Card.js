import React, { useEffect, useState } from 'react';
import './Blog.css';
// import { blog } from '../../Assets/data/data.js';
import { AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineTags } from "react-icons/ai";
import { Link } from 'react-router-dom';
// import {useSelector} from 'react-redux';

const Card = () => {
    const [posts, setPosts] = useState([]);
    const [commentsCount, setCommentsCount] = useState({});

    const getNumberofComments = async (postId) => {
        try {
            const res = await fetch(`/api/comment/get/${postId}`);
            if (res.ok) {
                const data = await res.json();
                return data.length;
            }
        } catch (error) {
            console.log(error.message);
            return 0;
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getPosts', {});
                const { posts } = await res.json();
                setPosts(posts);

                const commentsCounts = await Promise.all(
                    posts.map(async (post) => {
                        const count = await getNumberofComments(post._id);
                        return { postId: post._id, count };
                    })
                );

                const commentsCountMap = {};
                commentsCounts.forEach(({ postId, count }) => {
                    commentsCountMap[postId] = count;
                });

                setCommentsCount(commentsCountMap);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <section className='blog'>
                <div className='container grid3'>
                    {posts.map((item) => (
                        <div className='box boxitems' key={item._id}>
                            <div className='img'>
                                <Link to={`/details/${item._id}`}>
                                    <img src={item.coverImage} alt='cover' />
                                </Link>
                            </div>
                            <div className='details'>
                                <div className='tags'>
                                    <AiOutlineTags className='icon' />
                                    <a href='/'>#{item.category}</a>
                                </div>
                                <Link to={`/details/${item._id}`} className='link'>
                                    <h3>{item.title}</h3>
                                </Link>
                                <p>{item.content.slice(0, 180)} ...</p>
                                <div className='date'>
                                    <AiOutlineClockCircle className='icon' /> <label>{new Date(item.updatedAt).toLocaleDateString()}</label>
                                    <AiOutlineComment className='icon' /> <label>{commentsCount[item._id] || 0}</label>
                                    <AiOutlineShareAlt className='icon' /> <label>SHARE</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Card;
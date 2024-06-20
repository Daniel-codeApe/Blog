import React from 'react'
import './Blog.css'
import { blog } from '../../Assets/data/data.js'
import { AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineTags } from "react-icons/ai/index.esm.js"
import { Link } from 'react-router-dom'

export const Card = () => {
  return (
    <>
        <section className='blog'>
            <div className='container grid3'>
                {blog.map((item) => (
                    <div className='box boxitems' key={item.id}>
                        <div className='img'>
                            {/* link to the detail page when click on the title */}
                            <Link to={`/details/${item.id}`}>
                                <img src={item.cover} alt='cover' />
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
                            <Link to={`/details/${item.id}`} className='link'>
                                <h3>{item.title}</h3>
                            </Link>
                            <p>{item.desc.slice(0, 180)} ...</p>
                            {/* Icons for created date, number of comments, and share */}
                            <div className='date'>
                                <AiOutlineClockCircle className='icon' /> <label>{item.date}</label>
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

import React, { useState } from 'react'
import portrait from '../../Assets/images/portrait.jpg'
import { Link } from 'react-router-dom'

import { RiImageAddLine } from 'react-icons/ri';
import { IoSettingsOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

export const User = () => {

  const user = true;

  const [profileOpen, setprofileOpen] = useState(true);

  const close = () => {
    setprofileOpen(false);
  }

  return (
    <>
      <div className='profile'>
        {
          user ? (
            <>
              <button className='portrait' onClick={() => setprofileOpen(!profileOpen)}>
                <img src={portrait} alt='user' width={'100px'} />
              </button>

              {profileOpen && (
                <div className='openProfile boxItem' onClick={close}>
                  <Link to={'/account'}>
                    <div className='image'>
                      <div className='img'>
                        <img src={portrait} alt='userLogin' width={'100px'} />
                      </div>

                      <div className='text'>
                        <h4>Steel Dan</h4>
                        <p>Singarpore</p>
                      </div>
                    </div>
                  </Link>

                  <Link to={'/create'}>
                    <button className='box'>
                      <RiImageAddLine className='icon'/>
                      <h4>Create Post</h4>
                    </button>
                  </Link>

                  <Link to={'/settings'}>
                    <button className='box'>
                      <IoSettingsOutline className='icon'/>
                      <h4>Settings</h4>
                    </button>
                  </Link>

                  <Link to={'/wishlist'}>
                    <button className='box'>
                      <CiHeart className='icon'/>
                      <h4>Liked Posts</h4>
                    </button>
                  </Link>

                  <button className='box'>
                    <IoLogOutOutline className='icon'/>
                    <h4>Log Out</h4>
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to={'/login'}>
              <button>My Account</button>
            </Link>
          )
        }
      </div>
    </>
  )
}

export default User
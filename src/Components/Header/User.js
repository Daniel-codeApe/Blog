import React, { useState } from 'react'
import portrait from '../../Assets/images/portrait.jpg'
import { Link } from 'react-router-dom'

import { RiImageAddLine } from 'react-icons/ri';
import { IoSettingsOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

export const User = () => {

  // const user = true;

  const [user, setUserLoggedIn] = useState(true);

  const [profileOpen, setprofileOpen] = useState(true);

  const logout = () => {
    setUserLoggedIn(false);
  }

  const close = () => {
    setprofileOpen(false);
  }

  return (
    <>
      <div className='profile'>
        {
          // If user is true, show profile menu, otherwise show a link to login page
          user ? (
            <>
              <button className='portrait' onClick={() => setprofileOpen(!profileOpen)}>
                <img src={portrait} alt='user' width={'100px'} />
              </button>

              {profileOpen && (
                <div className='openProfile boxItem' onClick={close}>
                  {/* To profile update page */}
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

                  {/* To create post page */}
                  <Link to={'/create'}>
                    <button className='box'>
                      <RiImageAddLine className='icon'/>
                      <h4>Create Post</h4>
                    </button>
                  </Link>

                  {/* Right now it's blank */}
                  <Link to={'/settings'}>
                    <button className='box'>
                      <IoSettingsOutline className='icon'/>
                      <h4>Settings</h4>
                    </button>
                  </Link>

                  {/* Right now it's blank */}
                  <Link to={'/wishlist'}>
                    <button className='box'>
                      <CiHeart className='icon'/>
                      <h4>Liked Posts</h4>
                    </button>
                  </Link>

                  {/* Log out */}
                  <button className='box'>
                    <IoLogOutOutline className='icon'/>
                    <h4 onClick={logout}>Log Out</h4>
                  </button>
                </div>
              )}
            </>
          ) : (
            // to login page, but right now we can't pass information between pages, 
            // so you can just refersh the page and you will be logged in again
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
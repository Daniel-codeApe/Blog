import React, { useState } from 'react'
import portrait from '../../Assets/images/portrait.jpg'
import { Link } from 'react-router-dom'

import { RiImageAddLine } from 'react-icons/ri';
import { IoSettingsOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

import { useDispatch, useSelector } from 'react-redux';
import { logOutSuccess } from '../../app/user/userSlice';

export const User = () => {

  const {currentUser} = useSelector(state => state.user);

  // const [user, setUserLoggedIn] = useState(false);

  const [profileOpen, setprofileOpen] = useState(false);

  // const logout = () => {
  //   setUserLoggedIn(false);
  // }

  const close = () => {
    setprofileOpen(!profileOpen);
  }

  const dispatch = useDispatch();


  const handleLogOut = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/user/logout', {
            method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data.message);
        } else {
            dispatch(logOutSuccess(data));
        }
    } catch (error) {
        console.log(error.message);
    }
}

  return (
    <>
      <div className='profile'>
        {
          // If user is true, show profile menu, otherwise show a link to login page
          currentUser ? (
            <>
              <button className='portrait' onClick={() => setprofileOpen(!profileOpen)}>
                <img src={portrait || currentUser.profileImageURL} alt='user' width={'100px'} />
              </button>

              {profileOpen && (
                <div className='openProfile boxItem' onClick={close}>
                  {/* To profile update page */}
                    <div className='image'>
                      <div className='img'>
                        <img src={portrait} alt='userLogin' width={'100px'} />
                      </div>

                      <div className='text'>
                        <span>{currentUser.username}</span>
                        <h4>{currentUser.email}</h4>
                      </div>
                    </div>

                  {/* To create post page */}
                  <Link to={'/create'}>
                    <button className='box'>
                      <RiImageAddLine className='icon'/>
                      <h4>Create Post</h4>
                    </button>
                  </Link>

                  {/* Right now it's blank */}
                  <Link to={'/account'}>
                    <button className='box'>
                      <IoSettingsOutline className='icon'/>
                      <h4>Profile</h4>
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
                  <button className='box' onClick={handleLogOut}>
                    <IoLogOutOutline className='icon'/>
                    <h4>Log Out</h4>
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
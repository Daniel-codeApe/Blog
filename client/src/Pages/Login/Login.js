import React from 'react'
import loginImg from '../../Assets/images/login.jpg'
import { Link } from 'react-router-dom'
import './Login.css'

export const Login = () => {
  return (
    <>
        <section className='login'>
            <div className='containers'>
                <div className='backImg'>
                    <img src={loginImg} alt='login' />
                    <div className='text'>
                        <h3>Log In</h3>
                        <h1>My Account</h1>
                    </div>
                </div>
                <form>
                    <span>Username or Email address</span>
                    <input type='text' required />
                    <span>Password</span>
                    <input type='password' required />
                    <button className='button'>Log In</button>
                    <Link to={'/register'}>Register</Link>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login
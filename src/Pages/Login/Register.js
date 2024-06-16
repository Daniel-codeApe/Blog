import React from 'react'
import loginImg from '../../Assets/images/login.jpg'
import { Link } from 'react-router-dom'
import './Login.css'

export const Register = () => {
  return (
    <>
        <section className='login'>
            <div className='containers'>
                <div className='backImg'>
                    <img src={loginImg} alt='login' />
                    <div className='text'>
                        <h3>Register</h3>
                        <h1>My Account</h1>
                    </div>
                </div>
                <form>
                    <span>Username</span>
                    <input type='text' required />
                    <span>Email address</span>
                    <input type='email' required />
                    <span>Password</span>
                    <input type='password' required />
                    <button className='button'>Register</button>
                    <Link to={'/login'}>Log in</Link>
                </form>
            </div>
        </section>
    </>
  )
}

export default Register
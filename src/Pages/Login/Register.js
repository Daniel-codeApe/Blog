import React, { useState } from 'react'
import loginImg from '../../Assets/images/login.jpg'
import { Link } from 'react-router-dom'
import './Login.css'

export const Register = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
        console.log(formData);
    }

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
                    <input type='text' id='username' onChange={handleChange} />
                    <span>Email address</span>
                    <input type='email' id='email' onChange={handleChange} />
                    <span>Password</span>
                    <input type='password' id='password' onChange={handleChange} />
                    <button className='button'>Register</button>
                    <Link to={'/login'}>Log in</Link>
                </form>
            </div>
        </section>
    </>
  )
}

export default Register
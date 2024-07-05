import React, { useState } from 'react'
import loginImg from '../../Assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../app/user/userSlice.js';

export const Login = () => {
    const [formData, setFormData] = useState({});
    const {loading, error: errorMessage} = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
    }

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill out all required fields!'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/Blog');
            }
        } catch (err) {
            dispatch(signInFailure(err.message));
        }
    }

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
                <form onSubmit={handleSubmission}>
                    <label htmlFor='email'>Email address *</label>
                    <input type='email' id='email' onChange={handleChange} />
                    <label htmlFor='password'>Password *</label>
                    <input type='password' id='password' onChange={handleChange} />
                    <button className='button' type='submit' disabled={loading}>
                        {loading ? "Loading..." : "Log in"}
                    </button>
                    <p>Doesn't hava an account? <Link to={'/register'}>Register</Link></p>
                    { errorMessage && (<span className='alert'>{errorMessage}</span>) }
                </form>
            </div>
        </section>
    </>
  )
}

export default Login
import React, { useState } from 'react'
import loginImg from '../../Assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export const Register = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
    }

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Please fill out all required fields!');
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            setLoading(false);
            if (res.ok) {
                navigate('/login')
            }
        } catch (err) {
            setLoading(false);
            setErrorMessage(err.message);
        }
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
                <form onSubmit={handleSubmission}>
                    <label htmlFor='username'>Username *</label>
                    <input type='text' id='username' onChange={handleChange} />
                    <label htmlFor='email'>Email address *</label>
                    <input type='email' id='email' onChange={handleChange} />
                    <label htmlFor='password'>Password *</label>
                    <input type='password' id='password' onChange={handleChange} />
                    <button className='button' type='submit' disabled={loading}>
                        {loading ? 'loading...' : 'Register'}
                    </button>
                    <p>Aleady have an account? <Link to={'/login'}>Log in</Link></p>
                    { errorMessage && (<alert>{errorMessage}</alert>) }
                </form>
            </div>
        </section>
    </>
  )
}

export default Register
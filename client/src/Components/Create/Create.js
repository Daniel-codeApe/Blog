import React, { useState } from 'react'
import './Create.css'
import { useNavigate } from 'react-router-dom';

export const Create = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const handleTextChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {return;}

        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrorMessage(data.message);
                return;
            } else {
                navigate('/Blog');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log(formData);

  return (
    <>
        <section className='newPost'>
            <div className='container boxItems'>
                <div className='image'>
                    <img src='https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='user' />
                </div>
                <form onSubmit={handleSubmit}>
                    {/* where the user input the cover of their new blog */}
                    <div className='inputFile flexCenter'>
                        <input type='file' />
                    </div>
                    <select id='category' onChange={handleTextChange}>
                        <option value={'uncatgorized'}>Select a category (optional)</option>
                        <option value={'Life'}>Life</option>
                        <option value={'Nature'}>Nature</option>
                        <option value={'Travel'}>Travel</option>
                        <option value={'Sport'}>Sport</option>
                        <option value={'Fashion'}>Fashion</option>
                        <option value={'Health'}>Health</option>
                        <option value={'Business'}>Business</option>
                        <option value={'Technology'}>Technology</option>
                    </select>
                    {/* title input, content input, and submit button */}
                    <input id='title' type='text' placeholder='Title' onChange={handleTextChange}/>
                    <textarea id='content' cols='30' rows='10' onChange={handleTextChange}></textarea>
                    <button type='submit' className='button'>Create Post</button>
                    { errorMessage && (<span className='alert'>{errorMessage}</span>) }
                </form>
            </div>
        </section>
    </>
  )
}

export default Create
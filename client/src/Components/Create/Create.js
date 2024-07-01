import React, { useEffect, useState } from 'react'
import './Create.css'
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const Create = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [uploadMessage, setUploadMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleTextChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setUploadMessage('image selected');
    }

    const uploadImage = async () => {
        if (!imageFile) {
            setUploadMessage('You need to choose an image first!');
            return;
        }

        const s3 = new S3Client({
            region: process.env.REACT_APP_AWS_REGION,
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            }
        });
        try {
            setUploadMessage('Uploading...')

            const newFileName = uuidv4() + imageFile.name;

            const uploadParams = {
                Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
                Key: newFileName,
                Body: imageFile,
                ACL: 'public-read',
            };
            const command = new PutObjectCommand(uploadParams);
            const data = await s3.send(command);
            console.log(data);


            const url = `https://${process.env.REACT_APP_S3_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
            console.log(url);
            setFormData({...formData, "coverImage": url});
        } catch (error) {
            console.log(error);
        }
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

    useEffect(() => {
        if (formData.coverImage){
            console.log("form url:" + formData.coverImage);
            setUploadMessage('Image uploaded');
        };
    }, [formData]);

  return (
    <>
        <section className='newPost'>
            <div className='container boxItems'>
                <div className='image'>
                    <img src='https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='user' />
                </div>
                <form onSubmit={handleSubmit}>
                    {/* where the user input the cover of their new blog */}
                    <div className='inputFile'>
                        <input type='file' accept='image/*' onChange={handleImageChange}/>
                        <button className='uploadButton' onClick={uploadImage}>Upload</button>
                    </div>
                    { uploadMessage && (<span>{uploadMessage}</span>) }
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
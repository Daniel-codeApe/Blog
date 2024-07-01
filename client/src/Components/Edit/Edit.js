import React, { useEffect, useState } from 'react'
import './Edit.css';

import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useSelector } from 'react-redux';

export const Edit = () => {
  const {postId} = useParams();

  const [Post, setPost] = useState([]);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [errorMessgae, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // console.log(currentUser);

  useEffect(() => {
      const fetchPost = async () => {
          const res = await fetch(`/api/post/getPosts?postId=${postId}`, {});
          const data = await res.json();
          if (!res.ok) {
              console.log(data.message);
              return;
          }
          if (res.ok) {
              setPost(data.posts[0]);
          }
      };
      
      fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setUploadMessage('Image Selected');
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

  useEffect(() => {
    if (formData.coverImage){
        console.log("form url:" + formData.coverImage);
        setUploadMessage('Image uploaded');
    };
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {return;}

    setErrorMessage(null);

    try {
      const res = await fetch(`/api/post/updatePost/${postId}/${currentUser._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
            if (!res.ok) {
                setErrorMessage(data.message);
            } else {
                navigate('/Blog');
            }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <section className='updatePost'>
        <div className='container boxItems'>
          <div className='image'>
                <img src='https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='user' />
          </div>
          <form className='submitForm' onSubmit={handleSubmit}>
            <div className='inputFile'>
                <input type='file' accept='image/*' onChange={handleImageChange}/>
                <button className='uploadButton' onClick={uploadImage}>Upload Image</button>
                {uploadMessage && (<span>{uploadMessage}</span>)}
            </div>

              <label htmlFor='category'>Category: </label>
              <select id='category' defaultValue={Post.category} onChange={handleChange}>
                <option value={'uncategorized'}>Uncategorized</option>
                <option value={'Life'}>Life</option>
                <option value={'Nature'}>Nature</option>
                <option value={'Travel'}>Travel</option>
                <option value={'Sport'}>Sport</option>
                <option value={'Fashion'}>Fashion</option>
                <option value={'Health'}>Health</option>
                <option value={'Business'}>Business</option>
                <option value={'Technology'}>Technology</option>
              </select>
              <br />
              <label htmlFor='title'>Title</label>
              <input id='title' type='text' placeholder='post title' defaultValue={Post.title} onChange={handleChange}/>
              <label htmlFor='content'>Post Content</label>
              <textarea id='content' cols='30' rows='10' defaultValue={Post.content} onChange={handleChange}></textarea>
              <button type='submit' className='Button'>Update Post</button>
              {errorMessgae && (<span className='alert'>{errorMessgae}</span>)}
          </form>
        </div>
      </section>
    </>
  )
}

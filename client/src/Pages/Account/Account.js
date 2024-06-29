import React, { useEffect, useRef, useState } from 'react'
//import image from '../../Assets/images/chooseImage.png'
import portrait from '../../Assets/images/portrait.jpg'
import './Account.css'
import { v4 as uuidv4 } from 'uuid';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import imageCompression from 'browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';
import { 
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserFailure, 
    deleteUserStart, 
    deleteUserSuccess, 
    logOutSuccess
} from '../../app/user/userSlice';
import { useNavigate } from 'react-router-dom';

window.Buffer = window.Buffer || require("buffer").Buffer;

export const Account = () => {
    const { currentUser, deleteError } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(portrait);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileRef = useRef();

    const handleTextChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    }

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, 
                {method: 'DELETE'});

            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
                navigate('/Blog');
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {return;}

        try {
            dispatch(updateStart());
            console.log(formData);
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
            } else {
                dispatch(updateSuccess(data));
                navigate('/Blog');
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    }

    const handleLogOut = async () => {
        try {
            const res = await fetch('/api/user/logout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(logOutSuccess(data));
                navigate('/login');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const uploadImage = async () => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 300,
            useWebWorker: true
        }
        const s3 = new S3Client({
            region: process.env.REACT_APP_AWS_REGION,
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            }
        });
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            const newFileName = uuidv4() + compressedFile.name;

            const uploadParams = {
                Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
                Key: newFileName,
                Body: compressedFile,
                ACL: 'public-read',
            };
            const command = new PutObjectCommand(uploadParams);
            const data = await s3.send(command);
            console.log(data);


            const url = `https://${process.env.REACT_APP_S3_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
            setImageFileURL(url);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        };
    }, [imageFile]);

    useEffect(() => {
        if (imageFileURL && imageFile) {
            setFormData((prevData) => ({ ...prevData, profileImageURL: imageFileURL }));
            console.log("image url:" + imageFileURL);
        };
    }, [imageFileURL]);

    useEffect(() => {
        if (formData.profileImageURL){
            console.log("form url:" + formData.profileImageURL);
        };
    }, [formData]);

    useEffect(() => {
        if (showModal) {
            document.getElementById("myModal").style.display = "block";
        } else {
            document.getElementById("myModal").style.display = "none";
        }
    })

  return (
    <>
        <section className='accountinfo'>
            <div className='container boxItems'>
                <h1>Account Infomation</h1>
                <div className='content'>

                    <form className='submitForm' onSubmit={handleSubmit}>
                        <div className='left'>
                            <input type='file' onChange={handleImageChange} accept='image/*' ref={fileRef} hidden/>
                            <img src={currentUser.profileImageURL || portrait} alt='images' onClick={() => fileRef.current.click()} />
                        </div>
                        <div className='right'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' id='username' placeholder='new username' onChange={handleTextChange}/>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' placeholder='new email' onChange={handleTextChange} />
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' placeholder='new password' onChange={handleTextChange}/>
                            <button className='button' type='submit'>Update</button>
                        </div>
                    </form>

                    <div className='actions'>
                        <button className='deleteButton' onClick={() => setShowModal(true)}>Delete Account</button>
                        <button className='signout' onClick={handleLogOut}>Signout</button>
                    </div>
                </div>
            </div>

            {deleteError && (<span className='alert'>{deleteError}</span>)}

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <p>Are you sure you want to delete this account?</p>
                    <button className='delete' onClick={handleDeleteUser}>Yes, I'm sure</button>
                    <button className="close" onClick={() => setShowModal(false)}>No, take me back</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Account
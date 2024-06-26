import React, { useEffect, useRef, useState } from 'react'
//import image from '../../Assets/images/chooseImage.png'
import portrait from '../../Assets/images/portrait.jpg'
import './Account.css'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import imageCompression from 'browser-image-compression';

window.Buffer = window.Buffer || require("buffer").Buffer;

export const Account = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const fileRef = useRef();

    const binaryToBlob = (binaryData, contentType) => {
        return new Blob([binaryData], {type: contentType});
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFileURL(URL.createObjectURL(binaryToBlob(imageFile)));
            setImageFile(file);
        }
    }
    console.log("File:", imageFile);
    console.log("File URL:", imageFileURL);

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

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

            const uploadParams = {
                Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
                Key: compressedFile.name,
                Body: compressedFile,
            };
            const command = new PutObjectCommand(uploadParams);
            const data = await s3.send(command);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <section className='accountinfo'>
            <div className='container boxItems'>
                <h1>Account Infomation</h1>
                <div className='content'>
                    <div className='left'>
                        <input type='file' onChange={handleImageChange} accept='image/*' ref={fileRef} hidden/>
                        <img src={imageFileURL || portrait} alt='images' onClick={() => fileRef.current.click()} />
                    </div>
                        <div className='right'>
                            {/* will show current username */}
                            <label htmlFor='username'>Username</label>
                            <input type='text' id='username'/>

                            {/* will show current email */}
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' />

                            {/* won't show current password, but can input new password */}
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' />

                            {/* submit button */}
                            <button className='button'>Update</button>
                        </div>
                    </div>
                
            </div>
        </section>
    </>
  )
}

export default Account
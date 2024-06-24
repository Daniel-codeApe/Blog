import React, { useRef, useState } from 'react'
//import image from '../../Assets/images/chooseImage.png'
import portrait from '../../Assets/images/portrait.jpg'
import './Account.css'

export const Account = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileUrl] = useState(null);
    const fileRef = useRef();

    function binaryToBlob(binaryData, contentType) {
        return new Blob([binaryData], {type: contentType});
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // console.log(imageFile instanceof File); 
            // console.log(imageFile instanceof Blob);
            setImageFileUrl(URL.createObjectURL(binaryToBlob(imageFile)));
        }
        console.log(imageFile, imageFileURL);
    }
  return (
    <>
        <section className='accountinfo'>
            <div className='container boxItems'>
                <h1>Account Infomation</h1>
                <div className='content'>
                    <div className='left'>
                        <form>
                            <input type='file' onChange={handleImageChange} accept='image/*' ref={fileRef} hidden/>
                        </form>
                        <img src={imageFileURL || portrait} alt='images' onClick={() => fileRef.current.click()} />
                    </div>
                        <div className='right'>
                            {/* will show current username */}
                            <label>Username</label>
                            <input type='text' />

                            {/* will show current email */}
                            <label>Email</label>
                            <input type='email' />

                            {/* won't show current password, but can input new password */}
                            <label>Password</label>
                            <input type='password' />

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
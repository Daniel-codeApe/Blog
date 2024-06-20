import React from 'react'
//import image from '../../Assets/images/chooseImage.png'
import portrait from '../../Assets/images/portrait.jpg'
import './Account.css'

export const Account = () => {
  return (
    <>
        <section className='accountinfo'>
            <div className='container boxItems'>
                <h1>Account Infomation</h1>
                <div className='content'>
                    <div className='left'>
                        <div className='img flexCenter'>
                            <input type='file' src={portrait} alt='imgs' />
                            <img src={portrait} alt='images' />
                        </div>
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
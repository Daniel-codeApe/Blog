import React from 'react'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { RiInstagramFill } from 'react-icons/ri'

export const Footer = () => {
  return (
    <>
        <footer className='boxItems'>
            <div className='container flex'>
                <p>Proin interdum sed velit id consequat. Morbi sit amet neque ut sem vehicula posuere quis gravida tellus</p>
                <div className='social'>
                    <BsFacebook className='icon' />
                    <RiInstagramFill className='icon' />
                    <AiFillTwitterCircle className='icon' />
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer

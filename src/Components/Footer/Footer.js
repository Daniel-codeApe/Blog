import React from 'react'
import { AiFillTwitterCircle } from 'react-icons/ai/index.esm.js'
import { BsFacebook } from 'react-icons/bs/index.esm.js'
import { RiInstagramFill } from 'react-icons/ri/index.esm.js'

export const Footer = () => {
  return (
    <>
        <footer className='boxItems'>
            <div className='container flex'>
                <p>Proin interdum sed velit id consequat. Morbi sit amet neque ut sem vehicula posuere quis gravida tellus</p>
                {/* Icons of facebook, instagram, and twitter */}
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

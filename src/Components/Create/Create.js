import React from 'react'
import './Create.css'

export const Create = () => {
  return (
    <>
        <section className='newPost'>
            <div className='container boxItems'>
                <div className='image'>
                    <img src='https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='user' />
                </div>
                <form>
                    <div className='inputFile flexCenter'>
                        <input type='file' />
                    </div>
                    <input type='text' placeholder='Title' />
                    <textarea name='' id='' cols='30' rows='10'></textarea>
                    <button className='button'>Create Post</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default Create
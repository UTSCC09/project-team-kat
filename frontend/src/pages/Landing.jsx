import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LandingPicture from '../images/landing.png'
import '../styles/Landing.css'

function Landing() {
    return (
        <div>
            <Navbar />
            <div className='wrapper'>

                <div className='heading'>
                    Welcome to Paymates!
                </div>
                <div className='info'>
                    PayMates offers an easy and affordable way to split costs and communicate between your roomates.
                </div>
                <div className='image-container'>
                    <img className='image' src={LandingPicture} />
                </div>
                <div className='button'>
                    <Link className='join-btn' to="signup">Join Paymates today!</Link>
                </div>
            </div>
        </div>
    )
}

export default Landing
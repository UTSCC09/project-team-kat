import React from 'react'
import Navbar from '../components/Navbar'
import LoginPic from '../images/login.png'
import '../styles/Login.css'

function Login() {
  return (
    <div>
        <Navbar />
        <div className='login-wrapper'>
        <div className='login-container'>
            <div className='login-info'>
                <div className='login-cred'>
                    <div className='label'>Username</div>
                    <input className='input'></input>
                    <div className='label'>Password</div>
                    <input className='input'></input>
                </div>
                <div className='btn-container'>
                    <button className='login-btn'>Login</button>
                </div>
            </div>
            <div className='login-picture'>
                <div className='login-welcome'>Welcome Back!</div>
                <div className='login-image-container'>
                    <img className='login-image' src={LoginPic} />
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login
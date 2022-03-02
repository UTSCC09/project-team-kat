import React from 'react'
import Navbar from '../components/Navbar'
import RegisterPic from '../images/register.png'
import '../styles/Login.css'

function Register() {
    return (
        <div>
            <Navbar />
            <div className='login-wrapper'>
                <div className='login-container'>
                    <div className='login-picture'>
                        <div className='login-welcome'>Nice to meet you!</div>
                        <div className='login-image-container'>
                            <img className='login-image' src={RegisterPic} />
                        </div>
                    </div>
                    <div className='login-info'>
                        <div className='login-cred'>
                            <div className='label'>Name</div>
                            <input className='input'></input>
                            <div className='label'>Email</div>
                            <input className='input'></input>
                            <div className='label'>Password</div>
                            <input className='input'></input>
                        </div>
                        <div className='btn-register-container'>
                            <button className='login-btn'>Login</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register
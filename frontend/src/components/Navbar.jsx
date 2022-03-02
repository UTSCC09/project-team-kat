import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className='container'>
        <div className='logo'>

        </div>
        <div className='links'>
            <Link className='link' to="/login">Register</Link>
            <Link className='link' to="/signup">Sign Up</Link>
        </div>
    </div>
  )
}

export default Navbar
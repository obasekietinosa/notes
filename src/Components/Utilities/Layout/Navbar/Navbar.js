import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import './Navbar.css'

export default function Navbar() {
    return (
      <div className="Navbar">
        <div className="container">
          <div class="Navleft"> 
            <img src={logo} class="img-fluid" />
          </div>
          <div class="Navright">
            <div class="NavLinks">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                <li><Link to="/categories">Categories</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}
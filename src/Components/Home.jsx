import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/sainsta.png'
import { useState } from 'react'

function Home() {
    const username = localStorage.getItem('username');
    return (
        <div className='home-main'>
            <p style={{color:"#fff",borderBottom:"1px solid rgba(255, 255, 255, 0.1)",padding:"1px"}}> <img className='main-log0' style={{width:'70%'}} src={logo} alt="" /> </p>
            <p className='profile-mobile'> <NavLink style={{textDecoration:"none"}} to="/profile"><p style={{color:"#fff" , display:"flex", alignItems:"center"}}><div className='userLogo'>{username?.charAt(0).toUpperCase()}</div> </p></NavLink></p>
            <div className='home-inside'> 
                <p><NavLink to='/mainhome'><i class="fa fa-bank"></i>&nbsp;Home</NavLink></p>
                <p><NavLink to="/explore"><i class="fa fa-search"></i>&nbsp;Explore</NavLink></p>
                <p><NavLink to="/topcreator"><i class="fa fa-group"></i>&nbsp;People</NavLink></p>
                <p><NavLink to='/uploadreels'><i class="fa fa-plus-square"></i>&nbsp;Upload Reel</NavLink></p>
                <p><NavLink to='/upload'><i class="fa fa-pencil-square-o"></i>&nbsp;Create Post</NavLink></p>
                <p><NavLink to='/reels'><i class="fa fa-camera"></i>&nbsp;Watch Reels</NavLink></p>
                <p><NavLink to='/logout'><i class="fa fa-location-arrow"></i>&nbsp;Logout</NavLink></p>
            </div>


            
        </div>
    )
}

export default Home
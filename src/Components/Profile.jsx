import React from 'react'
import { NavLink } from 'react-router-dom'
import UploadedPost from './UploadedPost'
import Home from './Home'
import ProfilePicture from './ProfilePicture'


function Profile() {

    return (
        <>
        
        <div style={{position:"fixed"}}><Home /></div>
           <div className='profile-main' style={{position:"absolute",right:'0px',width:"80%"}}>
           <div>
                <center>
                    <UploadedPost />
                </center>
            </div>
           </div>
           <div className='home-inside-mobile' id='home-inside-mobile'> 
                <p><NavLink to='/mainhome'><i class="fa fa-bank"></i></NavLink></p>
                <p><NavLink to="/explore"><i class="fa fa-search"></i></NavLink></p>
                <p><NavLink to="/topcreator"><i class="fa fa-group"></i></NavLink></p>
                <p><NavLink to='/uploadreels'><i class="fa fa-plus-square"></i></NavLink></p>
                <p><NavLink to='/upload'><i class="fa fa-pencil-square-o"></i></NavLink></p>
                <p><NavLink to='/reels'><i class="fa fa-camera"></i></NavLink></p>
            </div>
        </>
    )
}

export default Profile
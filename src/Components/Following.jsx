import React, { useState, useEffect } from 'react';
import { Client, Databases, Query, Storage } from "appwrite";
import { NavLink } from 'react-router-dom';
import Home from './Home';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);





function Following() {
    const userID = localStorage.getItem('userid')
    const [followinguser, setFollowinguser] = useState([]);

    const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6548a8d3b711f3ca30ce");
    const databases = new Databases(client);
    const storage = new Storage(client);

    useEffect(() => {

        client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("6548a8d3b711f3ca30ce");
        const databases = new Databases(client);
        const promise = databases.listDocuments(
            "6549f89d81af648bcc4e",
            "6562eb9030fb08daac31",
            [Query.equal("yourID", userID)]
        );
        promise.then((response) => {
            setFollowinguser(response.documents);
            console.log(response)
          
        });
    }, []);

    const username = localStorage.getItem('username')

    async function handleUnfollow(documentID){
        try{
            const deleted = databases.deleteDocument(
                '6549f89d81af648bcc4e',
                '6562eb9030fb08daac31',
                documentID
            )
            Swal.fire({
                title: "Unfollow Seccussfully",
                icon:"success",
                showConfirmButton:true,
              });
              setTimeout(()=>
             {window.location.reload()},2000 )
        }
        
        catch(error){
            console.log(error.message)
            Swal.fire({
                title: "Unable to unfollow",
                icon:"warning",
                showConfirmButton:true,
              });
        }
    }

    const profilePicture = storage.getFilePreview('656ad1960298284913de', userID)

    return (
        <>
         
         <div style={{position:"fixed"}}>
            <Home />
         </div>
        <div className='profile-main' style={{ width:"80%",position:"absolute", right:"0px"}}>
        <div className='profile-info' style={{ display: "flex",  justifyContent: "center", gap: "40px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1" }}>
                <div><p style={{ color: "#fff", display: "flex",  }}><div style={{
                    width: "120px",
                    fontSize: "50px",
                    fontWeight: "700",
                    height: "120px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", background: "#ed943b"
                }}>
                    
                    {profilePicture ? (
                        <img className='profile-image' src={profilePicture} alt="Your Image" />
                    ) : (
                        <p>{ username?.charAt(0).toUpperCase() }</p>
                    )}
                    
                    </div>&nbsp;  </p></div>
                <div style={{ color: "#ffff"}}>
                    <h2 style={{textAlign:"left"}}><span>{username}</span></h2>
                    <div style={{display:"flex", gap:'50px'}}>
                    <p style={{textAlign:"left"}}><NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/following">Following: {followinguser.length}&nbsp; <i style={{color:"#fff"}} class="fa fa-group"></i></NavLink></p>
                    
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "35px", color: "rgb(151, 151, 151)" }}>
                <NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/profile"><p><i class="fa fa-pencil-square"></i>&nbsp;Post </p></NavLink>
                <NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/savedpost"><p><i class="fa fa-bookmark-o"></i>&nbsp;Saved</p></NavLink>
                <NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/yourreels"><p><i class="fa fa-camera"></i>&nbsp;Reels</p></NavLink>
            </div>
            <br />
            <div className='following-user' >
                {followinguser?.map((user, index) => (
                    <div key={index}>
                        <span className='folow'>{user.userNAME.charAt(0)}</span><br />
                        <span className='name'>{user.userNAME}</span><br />
                        <span onClick={()=> handleUnfollow(user.$id)} className='unfollowbutton'>Unfollow</span>
                    </div>
                ))}
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
    );
}

export default Following;

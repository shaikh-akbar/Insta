import React from 'react'
import { useState, useEffect } from "react";
import { Client, Databases, Query, Storage } from "appwrite";
import { NavLink } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';


function UploadedPost() {
    const username = localStorage.getItem('username')
    const [documents, setDocuments] = useState([]);
    const[showHide, setShowHide] = useState(false);
    const userID = localStorage.getItem('userid')
    const client = new Client();
    client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6548a8d3b711f3ca30ce");
    const storage = new Storage(client);
    useEffect(() => {

        client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("6548a8d3b711f3ca30ce");
        const databases = new Databases(client);
        const promise = databases.listDocuments(
            "6549f89d81af648bcc4e",
            "6549f8b86328e8edada5",
            [Query.equal("userID", userID)]
        );
        promise.then((response) => {
            setDocuments(response.documents);
            console.log(response, 'response')
        });
    }, []);

    const profilePicture = storage.getFilePreview('656ad1960298284913de', userID)

    function ShowHideProfileUpload(){
        if(!showHide){setShowHide(true)} 
        console.log('not working') 
    }

    return (
        <>
             {showHide?(<ProfilePicture />) : 'null'}
            <div className='post-main' style={{ display: "flex", justifyContent: "center", gap: "40px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1" }}>
                <div><p style={{ color: "#fff", display: "flex", }}><div style={{
                    width: "120px",
                    fontSize: "50px",
                    fontWeight: "700",
                    height: "120px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", background: "#ed943b"
                }}>
                    {profilePicture ? (
                        <img className='profile-image' src={profilePicture}  />
                    ) : (
                        <p>{ username?.charAt(0).toUpperCase() }</p>
                    )}
                </div>&nbsp;  </p></div>
                <div style={{ color: "#ffff" }}>
                    <h2 style={{ textAlign: "left" }}><span>{username}</span></h2>
                    <h4  onClick={()=> ShowHideProfileUpload()} style={{textAlign:"left" ,color:"#fff"}}>Edit Profile</h4>
                    <div style={{ display: "flex", gap: '50px' }}>
                        <p style={{ textAlign: "left" }}><NavLink style={{ textDecoration: "none", color: "rgb(189, 189, 189)" }} to="/following">Following</NavLink></p>
                        <p style={{ textAlign: "left" }}>Post : {documents.length}  <i class="fa fa-pencil-square-o"></i> </p>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "35px", color: "rgb(151, 151, 151)" }}>
                <NavLink style={{ textDecoration: "none", color: "rgb(189, 189, 189)" }} to="/profile"><p><i class="fa fa-pencil-square"></i>&nbsp;Post </p></NavLink>
                <NavLink style={{ textDecoration: "none", color: "rgb(189, 189, 189)" }} to="/savedpost"><p><i class="fa fa-bookmark-o"></i>&nbsp;Saved</p></NavLink>
                <NavLink style={{ textDecoration: "none", color: "rgb(189, 189, 189)" }} to="/yourreels"><p><i class="fa fa-camera"></i>&nbsp;Reels</p></NavLink>
            </div>
            <div className='uploaded_Image'>
                {documents?.map((item, index) => (
                    <div key={index}>
                        <img src={storage.getFilePreview('6549d7a1558a505a0e51', item.ImageID)} alt={index} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default UploadedPost
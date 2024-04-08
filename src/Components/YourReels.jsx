import React from 'react'
import { useState, useEffect } from "react";
import { Client, Databases, Query, Storage } from "appwrite";
import { NavLink } from 'react-router-dom';
import Home from './Home';
import dummyProfile from '../assets/dummy-prifile.jpg'
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
            "65617aeb98b4cad236fe",
            [Query.equal("userID", userID)]
        );

        promise.then((response) => {
            setDocuments(response.documents);
            console.log(documents)
        });
    }, []);
    const profilePicture = storage.getFilePreview('656ad1960298284913de', userID)

    function ShowHideProfileUpload(){
        if(!showHide){setShowHide(true)}  
    }


    return (
        <>

            <div >
                <div style={{ position: "fixed" }}>
                    <Home />
                </div>

                <div className='profile-main' style={{ position: "absolute", right: "0px", width: "80%" }}>
                    <div className='profile-info' style={{ display: "flex", justifyContent: "center", gap: "40px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1" }}>
                        <div><p style={{ color: "#fff", display: "flex", }}><div style={{
                            width: "120px",
                            fontSize: "50px",
                            fontWeight: "700",
                            height: "120px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", background: "#ed943b"
                        }}>
                            {profilePicture ? (
                                <img className='profile-image' src={profilePicture} />
                            ) : (
                                <img style={{zIndex:"1000000", width:"200px"}} className='profile-image' src={dummyProfile} alt='dummy-profile' />
                            )}

                        </div>&nbsp;  </p></div>
                        <div style={{ color: "#ffff" }}>
                            <h2 style={{ textAlign: "left" }}><span>{username}</span></h2>
                            <h4  onClick={()=> ShowHideProfileUpload()} style={{textAlign:"left" ,color:"#fff"}}>Edit Profile</h4>
                            <div style={{ display: "flex", gap: '50px' }}>
                                <p style={{ textAlign: "left" }}><NavLink style={{ textDecoration: "none", color: "rgb(189, 189, 189)" }} to="/following">Following </NavLink></p>
                                <p style={{ textAlign: "left" }}>Reels : {documents.length}  <i class="fa fa-pencil-square-o"></i> </p>
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
                            <div className='' style={{  border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1px", background: "rgba(255,255,255,0.04)", height: "400px" }}>
                                <video style={{ objectFit: "cover !important", height: "100%", width: "100%" }} controls src={`https://cloud.appwrite.io/v1/storage/buckets/656179f6a990cc3afaae/files/${item.videoID}/view?project=6548a8d3b711f3ca30ce&mode=admin`} alt={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadedPost
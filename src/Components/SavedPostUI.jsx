import React from 'react'
import { useState, useEffect } from "react";
import { Client, Databases, Query, Storage } from "appwrite";
import { NavLink } from 'react-router-dom';
import Home from './Home'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProfilePicture from './ProfilePicture';
const MySwal = withReactContent(Swal);

function UploadedPost() {
    const [documents, setDocuments] = useState([]);
    const[showHide, setShowHide] = useState(false);
    const client = new Client();
    const userID = localStorage.getItem('userid')
    client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6548a8d3b711f3ca30ce");
    const storage = new Storage(client);
    const username = localStorage.getItem('username')
    const databases = new Databases(client);
    useEffect(() => {
        client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("6548a8d3b711f3ca30ce");
        const databases = new Databases(client);
        const promise = databases.listDocuments(
            "6549f89d81af648bcc4e",
            "655dd44cd80856a20437",
            [Query.equal("userID", userID)]
           
        );
        
        promise.then((response) => {
            setDocuments(response.documents);
            console.log(response.documents)
            localStorage.setItem('savedImage', JSON.stringify(response.documents))
        });
    }, []);


    async function handleDeletSavedPost(id){
        try{
            const savedDeleted = await databases.deleteDocument('6549f89d81af648bcc4e','655dd44cd80856a20437',id)
                Swal.fire({
                    title: "Image Deleted",
                    icon:"success",
                    showConfirmButton:true,});
                    window.location.reload()
                }
        catch(error){
            console.log(error.message);
        }
    }
    const profilePicture = storage.getFilePreview('656ad1960298284913de', userID);

    function ShowHideProfileUpload(){
        if(!showHide){setShowHide(true)}  
    }

    return (
        <>

         {showHide?(<ProfilePicture />) : 'null'}

            <div style={{ position: "fixed" }}><Home /></div>
            <div className='profile-main' style={{position: "absolute",right: '0px',width: "80%"}}>
                <div>
                    <div className='profile-info' style={{ display: "flex", justifyContent: "center", gap: "40px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1" }}>
                        <div><div style={{ color: "#fff", display: "flex", alignItems: "center" }}><p style={{width: "120px",fontSize: "50px",fontWeight: "700",height: "120px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", background: "#ed943b"
                        }}>
                            {profilePicture ? (
                        <img className='profile-image' src={profilePicture}  />
                    ) : (
                        <p>{ username?.charAt(0).toUpperCase() }</p>
                    )}
                            
                            
                            </p>&nbsp;  </div></div>
                        <div style={{ color: "#ffff" }}>
                            <h2 style={{ textAlign: "left" }}><span>{username}</span></h2>
                            <h4 onClick={()=> ShowHideProfileUpload()} style={{color:"#fff"}}>Edit Profile</h4>
                            <div style={{ display: "flex", gap: '50px' }}>
                                <p style={{ textAlign: "left" }}><NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/following">Following</NavLink></p>
                                <p style={{ textAlign: "left" }}>Saved : {documents.length}  <i class="fa fa-bookmark-o"></i> </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "35px", color: "rgb(151, 151, 151)" }}>
                        <NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/profile"><p><i class="fa fa-pencil-square"></i>&nbsp;Post </p></NavLink>
                        <NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/savedpost"><p><i class="fa fa-bookmark-o"></i>&nbsp;Saved</p></NavLink>
                        <NavLink style={{textDecoration:"none", color:"rgb(189, 189, 189)"}} to="/yourreels"><p><i class="fa fa-camera"></i>&nbsp;Reels</p></NavLink>
                    </div>
                    <center>
                        <div className='uploaded_Image'>
                            {documents?.map((item, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img src={storage.getFilePreview('6549d7a1558a505a0e51', item.ImageID)} alt={index} />
                                    <p onClick={()=> handleDeletSavedPost(item.$id)} className='delete-saved'><i class="fa fa-trash-o"></i></p>
                                   
                                </div>

                            ))}
                        </div>
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

export default UploadedPost
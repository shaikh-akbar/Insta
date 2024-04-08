import React from 'react'
import { useState } from 'react';
import { Client, Storage, ID, Databases } from 'appwrite';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function ProfilePicture() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const userid = localStorage.getItem('userid');
    const[showHideProfileuploadeBox,   setShowHideProfileuploadeBox] = useState(true)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadedFile(URL.createObjectURL(event.target.files[0]))
    };

    const BucketID = '656ad1960298284913de';
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6548a8d3b711f3ca30ce')
    const storage = new Storage(client);
    const handleUpload = () => {
        setError("");
        if (file) {

            const promise = storage.createFile(BucketID, userid, file);
            promise
                .then((response) => {
                    setUploadedFile(response);
                    Swal.fire({
                        title: "Profile Picture Uploaded",
                        icon: "success",
                        showConfirmButton: true,
                    });
                    setTimeout(()=>{
                       window.location.reload();
                    },2000)
                })
                .catch((error) => {
                    setError(error)
                    Swal.fire({
                        title: "Already Image exist, please remove first",
                        icon: "warning",
                        showConfirmButton: true,
                    });
                });
        }
    };


    async function DeleteProfilePic(){
        try{
            await storage.deleteFile(BucketID, userid);
            Swal.fire({
                title: "Picture Deleted Successfully",
                icon: "success",
                showConfirmButton: true,
            });
        }
        catch(error){
            Swal.fire({
                title: "Profile Picture not exist",
                icon: "warning",
                showConfirmButton: true,
            });
        }
    }

    function hideshowHide(){
        setShowHideProfileuploadeBox(false)
    }


    return (
        <>

          {
            showHideProfileuploadeBox ? (
                <div style={{display:"flex",justifyContent:"center",position:"absolute",width:"100%", height:"100%", alignItems:"center", zIndex:"1000"}}>
          <div className='upload-profile'>
                <div style={{ textAlign: "center", fontSize: "19px" }}><span> Upload Profile Picture</span></div>
                <div style={{ color: "green", display: "flex", justifyContent: 'center', width: "100%", alignItems: "center" }}><i style={{ zIndex: "100" }} class="fa fa-photo"></i>&nbsp; <input style={{ background: "#fff" }} type="file" id="profile-uploader" onChange={handleFileChange} /> <br /><br /></div>

                {uploadedFile && (
                    <div>

                        <img className='story-upload-image' src={uploadedFile} alt="Uploaded" />
                        <div onClick={handleUpload} style={{ background: "#42946e", color: "#ffff", textAlign: "center", padding: "8px", fontSize: "18px", borderRadius: "4px" }}>Upload&nbsp; <i class="fa fa-cloud-upload"></i></div>
                    </div>
                )}
                <div onClick={()=> DeleteProfilePic()} style={{ color: "red" }}><i class="fa fa-trash-o"></i>&nbsp; Remove Current Picture</div>
                <div onClick={()=> hideshowHide()} style={{ color: "blue" }}><center>Cencel</center></div>
            </div>
          </div>
            ) : 'null'
          }

        </>
    )
}

export default ProfilePicture
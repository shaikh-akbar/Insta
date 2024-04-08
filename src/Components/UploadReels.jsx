// UploadReels.js
import React, { useState } from 'react';
import { Client, Storage, ID, Databases } from 'appwrite';
import Home from './Home';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const UploadReels = () => {
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const userID = localStorage.getItem('userid');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const BucketID = '656179f6a990cc3afaae'; // Change this to your video bucket ID
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6548a8d3b711f3ca30ce');
    const storage = new Storage(client);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadedFile(URL.createObjectURL(event.target.files[0]));
    };

    const handleUpload = () => {
        setError("");
        if (file) {
            const promise = storage.createFile(BucketID, ID.unique(), file);
            promise
                .then((response) => {
                    setUploadedFile(response);
                    console.log(response);
                    VideoStoreID(userID, response.$id);
                    Swal.fire({
                        title: "Story Uploaded",
                        icon:"success",
                        showConfirmButton:true,
                      });
                      navigate('/reels');
                      setShowHide(false)
                      setTimeout(()=>{
                         window.location.reload()
                      },2000)
                })
                .catch((error) => {
                    setError(error);
                    console.log(error.message); // Failure
                });
        }
    };

    const databases = new Databases(client);
    // function for upload video ID
    async function VideoStoreID(userID, videoID) {
        try {
            const videoIDUserID = await databases.createDocument(
                '6549f89d81af648bcc4e',
                '65617aeb98b4cad236fe',
                ID.unique(),
                { userID, videoID }
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div>
                <div style={{ position: "fixed" }}><Home /></div>
                <div className='file-upload-main' style={{ position: "absolute", right: "20px", width: "80%" }}>
                    <center>
                        <h2 style={{ color: "#fff", fontFamily: "sans-serif" }}>Upload Your Video</h2>
                    </center>
                    <center>
                        <div className='upload-file'>
                            <input style={{ background: "#fff" }} type="file" id="uploader" onChange={handleFileChange} /> <br /><br />

                            {uploadedFile && (
                                <video width="320" height="240" controls>
                                    <source src={uploadedFile} type="video/mp4" />
                                </video>
                            )}
                            <br /><br />
                            <button onClick={handleUpload}>Upload</button>
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
    );
};

export default UploadReels;

import React, { useState } from 'react';
import { Client, Storage, ID, Databases } from 'appwrite';
import Home from './Home';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const userID = localStorage.getItem('userid');
    const [error, setError] = useState('');
    const BucketID = '6549d7a1558a505a0e51';
    const navigate = useNavigate();
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6548a8d3b711f3ca30ce')
    const storage = new Storage(client);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setUploadedFile(URL.createObjectURL(event.target.files[0]))
    };
    const handleUpload = () => {
        setError("");
        if (file) {
           
            const promise = storage.createFile(BucketID, ID.unique(), file);
            promise
                .then((response) => {
                    setUploadedFile(response);
                    console.log(response)
                    ImageStoreID(userID, response.$id)
                    Swal.fire({
                        title: "Image Uploaded",
                        icon:"success",
                        showConfirmButton:true,
                      });
                      navigate('/mainhome');
                })
                .catch((error) => {
                    setError(error)
                    console.log(error.message); // Failure
                    Swal.fire({
                        title: "Unable Uploaded",
                        icon:"warning",
                        showConfirmButton:true,
                      });
                });
        }
    };


    const databases = new Databases(client);
   async function ImageStoreID(userID, ImageID){
       try{
       const ImageIDUserID = await databases.createDocument(
            '6549f89d81af648bcc4e',
            '6549f8b86328e8edada5',
            ID.unique(),
            {userID, ImageID}
        );
       }
       catch(error){
        console.log(error.message)
       }
   }

    return (
        <>
            <div>
                <div style={{ position: "fixed" }}><Home /></div>
                <div className='file-upload-main' style={{ position: "absolute", right: "20px", width: "80%" }}>
                    <center>
                        <h2 style={{ color: "#fff", fontFamily: "sans-serif" }}>Upload Your Image</h2>
                    </center>
                    <center>
                        <div className='upload-file'>
                            <input style={{ background: "#fff" }} type="file" id="uploader" onChange={handleFileChange} /> <br /><br />

                            {uploadedFile && (
                                <img src={uploadedFile} alt="Uploaded" />
                            )}
                           
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

export default ImageUploader;

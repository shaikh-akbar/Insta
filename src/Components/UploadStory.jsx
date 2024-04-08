import React, { useState } from 'react';
import { Client, Storage, ID, Databases } from 'appwrite';
import Home from './Home';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function UploadStory() {


    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const userID = localStorage.getItem('userid');
    const [error, setError] = useState('');

    const[hideShow, setShowHide] = useState(true);
    const navigate = useNavigate();

    const BucketID = '65657e53ab3d00073d36';
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
                    ImageStoreID(response.$id)
                    Swal.fire({
                        title: "Story Uploaded",
                        icon:"success",
                        showConfirmButton:true,
                      });
                      navigate('/mainhome');
                      setShowHide(false)
                      setTimeout(()=>{
                         window.location.reload()
                      },2000)

                })
                .catch((error) => {
                    setError(error)
                    Swal.fire({
                        title: "Unable Uploaded",
                        icon:"warning",
                        showConfirmButton:true,
                      });
                });
        }
    };

  const username = localStorage.getItem('username')
  const SPersonName = username;
    const databases = new Databases(client);
    async function ImageStoreID( SImageID) {
        try {
            const ImageIDUserID = await databases.createDocument(
                '6549f89d81af648bcc4e',
                '6565b971e92e466fd86e',
                ID.unique(),
                { SPersonName, SImageID}
            );
           
        }
        catch (error) {
            console.log(error.message)
        }
    }



   function closeUploadStory(){
    setShowHide(false)
   }


    return (
        <>
           
           {
            hideShow? (
                <div className='upload-story-main' style={{position:'absolute', backdropFilter:"blur(90px)", borderRadius:"20px" , width:"50%" ,padding:"0px"}}>
                <div className='upload-story'>
                <p onClick={()=> closeUploadStory()} className='closestory'><i class="fa fa-close"></i></p>
                <div>
                    <center>
                        <h3 style={{ color: "#fff", fontFamily: "sans-serif" }}>Upload Your Story</h3>
                    </center>
                    <center>
                        <div className='upload-file' style={{width:"90%"}}>
                            <input style={{ background: "#fff" }} type="file" id="uploader" onChange={handleFileChange} /> <br /><br />

                            {uploadedFile && (
                                <img src={uploadedFile} alt="Uploaded" />
                            )}
                            
                            <button onClick={handleUpload}>Upload Story</button>
                        </div>
                    </center>
                </div>
            </div>
            </div>

            ) :'null'
           }
          
        </>
    )
}

export default UploadStory
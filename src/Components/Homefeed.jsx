import React, { useEffect, useState } from 'react';
import { Client, Storage, ID , Databases } from 'appwrite';
import UploadStory from './UploadStory';
import CreateStory from './CreateStory';
import ViewStory from './ViewStory';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { NavLink } from 'react-router-dom';


// ... (your other imports)

const Homefeed = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const BucketID = '6549d7a1558a505a0e51';

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6548a8d3b711f3ca30ce');

  const storage = new Storage(client);

  useEffect(() => {
    setError('');
    const promise = storage.listFiles(BucketID);

    promise
      .then((response) => {
        const dataFiles = response.files;
        setFiles(dataFiles);
        console.log(dataFiles)
      })
      .catch((error) => {
        setError(error);
        console.log(error.message);
      });
  }, []);
   const userID = localStorage.getItem('userid')

   const databases = new Databases(client);
   async function handleSaved(userID, ImageID){
    
    
       try{
        const savedImage = await databases.createDocument(
          '6549f89d81af648bcc4e',
          '655dd44cd80856a20437',
              ID.unique(),
              {userID, ImageID}
         )
         Swal.fire({
          position: "top-end",
          title: "Image Saved Successfully",
          showConfirmButton:false,
          timer: 3000, 
        });
       }
      
       catch(error){
        console.log(error.message)
       }
   }

  return (
    <>
      
      <div className='homefeed-main'>
        <div className='stories' style={{display:'flex', alignItems:"center", gap:"20px"}}>
        <CreateStory />
        <ViewStory />
        </div>
      
        <center>
          <div className='feed-card-main'>
            {files.map((item, index) => (
            
              <div className='feed-card' key={index}>
                <img
                  src={storage.getFilePreview(BucketID, item.$id)}
                  alt={item.name}
                />
                <div className='heart-download'>
                  <p>
                    <i className="fa fa-heart"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="fa fa-share-square"></i>
                  </p>
                  <p><i style={{cursor:"pointer"}} onClick={() => handleSaved(userID, item.$id)} class="fa fa-bookmark-o" ></i></p>
                </div>
              </div>
            ))}
          </div>
        </center>
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

export default Homefeed;

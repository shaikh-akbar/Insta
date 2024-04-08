import React, { useEffect, useState } from 'react';
import { Client, Storage, ID , Databases } from 'appwrite';
import Home from './Home';
import { NavLink } from 'react-router-dom';


function Explore() {
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

  return (
    <>
    <div style={{position:"fixed"}}><Home /></div>
     <div className='explore-main' style={{width:"80%", position:"absolute", right:"0px"}}>
     <h2 style={{color:"#ffff"}}>Explore Multiple Things ?</h2>
     <div className='explore'>
        {files.map((item, index)=>(
            <div key={index}>
              <img src={storage.getFilePreview(BucketID, item.$id)} alt="" />
              <p className='show-explore'><i class="fa fa-clone"></i></p>
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
  )
}

export default Explore
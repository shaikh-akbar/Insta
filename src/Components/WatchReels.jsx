import React, { useEffect, useState, useRef } from 'react';
import { Client, Storage, ID, Databases } from 'appwrite';
import Home from './Home';
import { NavLink } from 'react-router-dom';

const Homefeed = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [playingIndex, setPlayingIndex] = useState(null);
  const BucketID = '656179f6a990cc3afaae';
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6548a8d3b711f3ca30ce');
  const storage = new Storage(client);
  const videoRefs = useRef([]);

  useEffect(() => {
    setError('');
    const promise = storage.listFiles(BucketID);

    promise
      .then((response) => {
        const dataFiles = response.files;
        setFiles(dataFiles);
      })
      .catch((error) => {
        setError(error);
        console.log(error.message);
      });
  }, []);

  const userID = localStorage.getItem('userid');
  const databases = new Databases(client);

  const handleSaved = async (userID, ImageID) => {
    alert('Image Saved');
    try {
      await databases.createDocument(
        '6549f89d81af648bcc4e',
        '655dd44cd80856a20437',
        ID.unique(),
        { userID, ImageID }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      const index = videoRefs.current.indexOf(entry.target);
      if (entry.isIntersecting) {
        setPlayingIndex(index);
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  };

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, files.length); // Ensure refs array matches the number of videos
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      threshold: 0.5,
    });

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, [files]);

  return (
    <>
      <div style={{ position: 'fixed' }}>
        <Home />
      </div>
      <div  className='watch-reel-main'>
        <center>
          <div className='feed-card-main'>
            {files?.map((item, index) => (
              <div className='feed-card' style={{ height: '85vh' }} key={index}>
                <video
                  ref={(ref) => (videoRefs.current[index] = ref)}
                  controls
                  style={{ objectFit: 'cover', height: '76vh' }}
                  src={`https://cloud.appwrite.io/v1/storage/buckets/656179f6a990cc3afaae/files/${item.$id}/view?project=6548a8d3b711f3ca30ce&mode=admin`}
                  
                />
                <div className='heart-download'>
                  <p>
                    <i className='fa fa-heart'></i>&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class='fa fa-share-square'></i>
                  </p>
                  <p>
                    <i
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSaved(userID, item.$id)}
                      class='fa fa-bookmark-o'
                    ></i>
                  </p>
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

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Client, Storage } from "appwrite";
import { useState, useEffect } from 'react';

function ViewStory() {
    const [files, setFiles] = useState([]);
    const[hideShow, setShowHide] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const BucketID = '65657e53ab3d00073d36';

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6548a8d3b711f3ca30ce');

    const storage = new Storage(client);

    useEffect(() => {
        const promise = storage.listFiles(BucketID);

        promise
            .then((response) => {
                const dataFiles = response.files;
                setFiles(dataFiles);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    function handleStoryBox(id) {
        setSelectedImage(id);
        setShowHide(true);
        setTimeout(closeUploadStory, 10000)
    }

    function closeUploadStory(){
        setShowHide(false)
       }

    return (
        <>
       
            <div className='story-main'>
            
                {files?.map((item, index) => (
                    
                    <div
                        onClick={() => handleStoryBox(item.$id)}
                        className='story-box'
                        key={index}
                    >
                       
                        <img
                            className='story-image'
                            src={storage.getFilePreview(BucketID, item.$id)}
                            alt={item.name}
                        />
                    </div>
                ))}
            </div>

            {hideShow && (
                <div className='selected-image'>
                     <p className='line'></p>
                     <p className='closeline'></p>
                    <img
                        src={storage.getFilePreview(BucketID, selectedImage)}
                        alt={`Selected Image`}
                    />
                   <p style={{zIndex:"1000000"}} onClick={()=> closeUploadStory()} className='closestory'><i class="fa fa-close"></i></p>
                </div>
            )}
        </>
    );
}

export default ViewStory;

import React from 'react';
import { useState } from 'react';
import UploadStory from './UploadStory';

function CreateStory() {
  const [showhide, setShowHide] = useState(false);

  function toggleShowHide() {
    setShowHide(!showhide);
  }

  return (
    <><br />
      <div onClick={() => toggleShowHide()} className='create-story'>
        <i className="fa fa-plus-circle"></i>
      </div>
      <br />
      {showhide ? <UploadStory /> : null}
    </>
  );
}

export default CreateStory;

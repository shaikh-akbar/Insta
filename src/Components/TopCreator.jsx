import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Client, Databases, ID, Query} from "appwrite";
import { NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const TopCreator = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Set your Appwrite API endpoint, project ID, and API key
    const API_ENDPOINT = 'https://cloud.appwrite.io/v1';
    const PROJECT_ID = '6548a8d3b711f3ca30ce';
    const API_KEY = '9749b36aee38dfca3d16294a7f7f707f6ebf2852cdb25ae66fae2ac32b2eeaeae3b0ea0b86a8ea76cf9add308f39c1b2f38a957cd217d0667290972d92094f4de9f4db124c1cf4326d0e516285c72f899ffa02578cf93442e5e53d553630d9f39167ebb1ab385474f7dae735a3d394cfd527e65fbb98dd073b1b2f6662bd5463';

    // Define the headers with the API key
    const headers = {
      'X-Appwrite-Project': PROJECT_ID,
      'X-Appwrite-Key': API_KEY,
      'Content-Type': 'application/json',
    };

    // Make the request to list all users
    axios.get(`${API_ENDPOINT}/users`, { headers })
      .then(response => {
        // Successful request
        setUsers(response.data.users);
      })
      .catch(error => {
        // Request failed
        console.error('Failed to retrieve user list:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Follow Function
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6548a8d3b711f3ca30ce');

const databases = new Databases(client);
const username = localStorage.getItem('username')
const yourID = localStorage.getItem('userid')

  async function  handleFollow(userNAME, userID){
    try{
     const following = await databases.createDocument(
       '6549f89d81af648bcc4e',
       '6562eb9030fb08daac31',
       ID.unique(),
       {userID, userNAME, yourID}
     ) 
     Swal.fire({
       title: "Following Seccussfully",
       icon:"success",
       showConfirmButton:true,
     });
    }
    
    catch(error){
     console.log(error.message)
    }
}

  return (
    <div className='top-creator-main'>
      <h2 style={{ color: "#fff" }}>Top Creators</h2>
      <div style={{ padding: "7px" }}>
        <input
          placeholder='Search People'
          style={{
            width: "100%", background: "transparent",
            height: "36px", border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
            color:"#fff",
            letterSpacing:"1px",
            outline:"none"
          }}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className='topcreator-main'>
        {filteredUsers.map((user, index) => (
          <div className='peope-card' key={index}>
            <p className='people-logo'>{user.name.charAt(0)}</p>
            <p>{'@' + user.name}</p>
            <p   onClick={()=> handleFollow(user.name, user.$id)} className='people-follow'>Follow</p>
          </div>
        ))}
      </div>
      <div className='home-inside-mobile' id='home-inside-mobile'> 
                <p><NavLink to='/mainhome'><i class="fa fa-bank"></i></NavLink></p>
                <p><NavLink to="/explore"><i class="fa fa-search"></i></NavLink></p>
                <p><NavLink to="/topcreator"><i class="fa fa-group"></i></NavLink></p>
                <p><NavLink to='/uploadreels'><i class="fa fa-plus-square"></i></NavLink></p>
                <p><NavLink to='/upload'><i class="fa fa-pencil-square-o"></i></NavLink></p>
                <p><NavLink to='/reels'><i class="fa fa-camera"></i></NavLink></p>
            </div>
    </div>
  );
};

export default TopCreator;

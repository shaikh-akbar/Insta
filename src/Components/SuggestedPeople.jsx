import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Client, Databases, ID, Query} from "appwrite";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const TopCreator = () => {
  const [users, setUsers] = useState([]);

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

 // console.log(users)
 const username = localStorage.getItem('username')
 const yourID = localStorage.getItem('userid')



// handle follow starting from here 
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6548a8d3b711f3ca30ce');

const databases = new Databases(client);

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
    <div className='suggested-main'>
        <NavLink style={{textDecoration:"none"}} to="/profile"><p style={{color:"#fff" , display:"flex", alignItems:"center"}}><div className='userLogo'>{username?.charAt(0).toUpperCase()}</div>&nbsp; <strong>{username}</strong> </p></NavLink>
      <div style={{ padding: "1px" }}>
      
      </div>
       <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
       <h4 style={{color:"rgb(193, 193, 193)"}}>Suggested People</h4>
       <p><NavLink style={{color:"rgb(193, 193, 193)",textDecoration:"none"}} to='/topcreator'>See Alls</NavLink></p>
       </div>
      <div className='Suggested-people'>
        {users?.map((user) => (
          <div key={user.id} className='follow-suggestions'>
            <div style={{display:"flex",gap:'6px', alignItems:"center"}}>
            <div className='suggested-user'>{user.name.charAt(0)}</div>
            <div style={{color:"rgb(217, 217, 217)"}}>{'@' + user.name}</div>
            </div>
            <div className='folow-button'><span  onClick={()=> handleFollow(user.name, user.$id)} style={{color:"#55a1ff", cursor:"pointer",}}>Follow</span></div>
          </div>
        ))}
      </div>
 
    </div>
  );
};

export default TopCreator;

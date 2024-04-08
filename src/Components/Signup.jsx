import React, { useState } from 'react';
import { Client, Account, ID } from 'appwrite';
import validator from 'validator'; // Import the validator library
import { NavLink, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const client = new Client();
const account = new Account(client);


client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('6548a8d3b711f3ca30ce'); // Your project ID

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the email address
    if (!validator.isEmail(email)) {
      console.log('Invalid email address');
      return;
    }

    // Continue with account creation request
    account
      .create(ID.unique(), email, password, name)
      .then(function (response) {
        console.log(response)

        MySwal.fire({
          title: response.name,
          text: 'Account Created Successfully',
          icon: 'success',
        });
        
        navigate('/login');
      })
      .catch(function (error) {
        console.log(error); // Failure
        MySwal.fire({
          text: 'User Already Registered',
          icon: 'warning',
        });
      });
  };

  //console.log(name, email, password);

  return (
    <>
      <div className='bg-image'>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <center>
          <div className='signup'>
            <h3 style={{ fontFamily: 'cursive', color: "#ffff" }}>Create Account</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br /><br />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br /><br />
              <input
                type="password"
                value={password}
                minLength="8"
                placeholder='enter your password'

                onChange={(e) => setPassword(e.target.value)}
              />
              <br /><br />
              <button type="submit">Submit</button>
              <br /><br />
              <p style={{ color: "#fff" }}>Already have Account? <NavLink style={{ color: "#c9dffb" }} to='/login'>login</NavLink> </p>
            </form>
          </div>
        </center>
      </div>
    </>
  );
}

export default Signup;

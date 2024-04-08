import React, { useState } from 'react';
import { Client, Account, ID } from 'appwrite';
import validator from 'validator'; // Import the validator library
import { NavLink, useNavigate } from 'react-router-dom';

const client = new Client();
const account = new Account(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('6548a8d3b711f3ca30ce'); // Your project ID

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error, setError] = useState('');
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
      .createEmailSession(email,password)
      .then(function (response) {
        console.log(response); // Success
        console.log(response, 'user secussefully login');
        localStorage.setItem('userid', response.userId)
        localStorage.setItem("username", response.providerUid);
      
       navigate('/mainhome');
      })
      .catch(function (error) {
        console.log(error); // Failure
        setError(error.message)

      });
  };


  return (
     <>
    <div className='bg-image'>
    <p>&nbsp;</p>
     <p>&nbsp;</p>
     <center>
      <div className='signup'>
      <h3 style={{ fontFamily: 'cursive',color:"#ffff" }}>Login Here</h3>
      <form onSubmit={handleSubmit}>
       
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
        <p style={{color:"red"}}>{error? 'Invalid user or password' : ' '}</p>

        <button type="submit">Login</button><br /><br />
        <p style={{color:"#ffff"}}>Don't have Account? <span><NavLink style={{color:"#c9dffb"}} to='/signup'>Create Account</NavLink></span> </p>
      </form>
    </div>
    </center>
    </div>
     </>
  );
}

export default Login;

import React, { useEffect } from "react";
import { Client, Account } from "appwrite";
import Login from './Login'
import { useNavigate } from "react-router-dom";

const Logout = () => {

 const navigate = useNavigate();

  useEffect(() => {
    // Initialize Appwrite client and account
    const client = new Client();
    const account = new Account(client);

    client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("6548a8d3b711f3ca30ce"); // Your project ID

    // Function to delete sessions
    const deleteSessions = async () => {
      try {
        const response = await account.deleteSessions();
        console.log(response); // Success
        navigate('/login')
      } catch (error) {
        console.error(error); // Failure
      }
    };

    // Call the deleteSessions function when the component mounts
    deleteSessions();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <p>Appwrite Component</p>
      {/* You can add more JSX here */}
    </div>
  );
};

export default Logout;

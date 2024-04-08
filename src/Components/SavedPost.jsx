import React, { useState, useEffect } from "react";
import { Client, Databases, Query, Storage } from "appwrite";

const SavedPost = () => {
    const [documents, setDocuments] = useState([]);
    const userID = localStorage.getItem('userid')
    const client = new Client();
    useEffect(() => {
        
        client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("6548a8d3b711f3ca30ce");

        const databases = new Databases(client);

        const promise = databases.listDocuments(
            "6549f89d81af648bcc4e",
            "655dd44cd80856a20437",
            [Query.equal("userID", userID)]
        );

        promise.then((response) => {
            setDocuments(response.documents);
        });
    }, []);
  localStorage.setItem('SavedImage', JSON.stringify(documents));
  
 
  // The empty dependency array ensures that this effect runs once when the component mounts
  

    return (
        <>
          <div>
            hellow
          </div>
        </>
    );
};

export default SavedPost;
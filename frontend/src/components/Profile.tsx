import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { access } from "fs";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently }:any = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  const hgge = async () => {
    const domain = 'pon-product.jp.auth0.com'
    try{
      const accessToken = await getAccessTokenSilently({
      });
      console.log(accessToken)
    }
    catch(e){
      console.log(e.message)
  } 
}

  hgge()

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'pon-product.jp.auth0.com'
      try {
        const accessToken = await getAccessTokenSilently({
        });
        
        // console.log(accessToken)
        // const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        // const metadataResponse = await fetch(userDetailsByIdUrl, {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // });  
        // const { user_metadata } = await metadataResponse.json();
        // setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, [user]);
  

  return (
    isAuthenticated && (

      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.sub}</p>
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    )
  );
};

export default Profile;
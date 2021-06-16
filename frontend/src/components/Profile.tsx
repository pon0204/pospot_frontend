import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { access } from "fs";
import { useQueryClient, useMutation } from 'react-query'
import { User } from '../types/types'
import { useQueryChirps } from '../hooks/useQueryChirps'
import { selectUserToken,setToken } from "../slices/userToken";
import { useAppSelector,useAppDispatch } from "../app/hooks";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently }:any = useAuth0();

  const dispatch = useAppDispatch()
  const token = useAppSelector(selectUserToken)
  console.log(token)

  const queryClient = useQueryClient()
  const { status, data } = useQueryChirps()
  
  const tokenSave = () => {
    dispatch(setToken('さようなら'))    
  }

//   const hgge = async () => {

//     try{
//       const accessToken = await getAccessTokenSilently({
//       });
//       console.log(accessToken)
//     }
//     catch(e){
//       console.log(e.message)
//   } 
// }

//   hgge()

  const chirps =  queryClient.getQueryData('Chirps')
  console.log(chirps)
  

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
        <button onClick={tokenSave}>トークンセーブ</button>
      </div>
    )
  );
};

export default Profile;
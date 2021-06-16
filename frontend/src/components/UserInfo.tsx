import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { selectUserToken,setToken } from "../slices/userToken";
import { useAppSelector,useAppDispatch } from "../app/hooks";

const UserInfo = () => {
// const { getAccessTokenSilently } = useAuth0();
const token = useAppSelector(selectUserToken)
let headers = 
{
headers: {
  "Authorization": `Bearer ${token}`,
  "Content-Type": 'application/json',
  // "sub": 'google-oauth2|106160814069089305764'
}
}


const getClick = () =>{
  axios.get('http://localhost:3000/chirps/1',headers)
  // axios.get('https://pon-product.jp.auth0.com/api/v2/users/{google-oauth2|106160814069089305764}')
  .then(res =>{
    console.log(res.data)
  })
  .catch((e) => console.error(e))

}

  return (
    <div>
      <button onClick={getClick}>get</button>
    </div>
  )
}

export default UserInfo

// sub: "z3uwUG8ewVeoPyy43JzgREB77aLLln1p@clients"
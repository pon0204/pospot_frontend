import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const UserInfo = () => {
// const { getAccessTokenSilently } = useAuth0();
let headers = 
{
headers: {
  "Authorization": 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IngtazRJaHpQbzZrTzZmS0NaLW5SVyJ9.eyJpc3MiOiJodHRwczovL3Bvbi1wcm9kdWN0LmpwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MGM4MzM4MzdjMWIyNjAwNzJkMzZlMWEiLCJhdWQiOlsiaHR0cHM6Ly9wb3Nwb3QtYXV0aC1hcGkiLCJodHRwczovL3Bvbi1wcm9kdWN0LmpwLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MjM4MjM4MDQsImV4cCI6MTYyMzkxMDIwNCwiYXpwIjoiSnVqN2trSEFRSnV6NVdRTDNtdk8xaDNESkdSVWN1MHYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.nJKS87qlv-n3ElCZ5-cIFyf93RodlmFibGqv0cFX2hjSelpB9sHeOMYPM7MxurN0qj5AyeA1rpvktFT2pd6WPm49wvSwKMBlXLHZIuYsxFPckImrUtDKJQb_ZODSis9VfrVQVyGUqr4CCC-K9ZXG_YkYfZVkb6m9vOTvx-rmbADe5K4aapI3vmbXt6S-IxQWqOoGe3f6nTJubH1ghz6HVE7DTlSMjnilMmAcI4TWWM1GojFpSzr3CFNx-eMQiQgnHxwS95lY2RH32ksPCJkmvYE083Os7ffjcyouZVCDTCPaeTOKPsfwJb5SB1aRv9edsF1BmrG0KVryWRn21PgNXg',
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
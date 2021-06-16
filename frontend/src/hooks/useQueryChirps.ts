import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query'
import axios from 'axios'
import { User } from '../types/types'
import { useAuth0 } from "@auth0/auth0-react";

import { Auth0Provider } from '@auth0/auth0-react';

// export const useQueryChirps = () => {
//   const getChirps = async () => {
//     const { data } = await axios.get(
//       `http://localhost:3000/chirps`
//     )
//     return data
//   }
//   return useQuery({
//     queryKey: 'chirps',
//     queryFn: getChirps,
//     staleTime: 0,

//     // refetchOnWindowFocus: true,
//     //cacheTime: 5000,
//     // refetchInterval: 5000,
//   })
// }


// const getTasks = async () => {
//   const { data } = await axios.get(
//     `http://localhost:3000/chirps`)
  
//     return data
// }

// export const useQueryTasks = () => {
//   return useQuery({
//     queryKey: 'tasks',
//     queryFn: getTasks,
//     cacheTime: 10000,
//     staleTime: 0,
//   })
// }

export const useQueryChirps = () => {
  const getChirps = async () => {
  const { data } = await axios.get(
    `http://localhost:3000/chirps`)
    return data
  }
  return useQuery({
    queryKey: 'Chirps',
    queryFn: getChirps,
    staleTime: 0,
    // refetchOnWindowFocus: true,
    //cacheTime: 5000,
    // refetchInterval: 5000,
  })
}
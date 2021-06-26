import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query'
import axios from 'axios'
import { PostData, User } from '../types/types'
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../app/hooks";
import { Auth0Provider } from '@auth0/auth0-react';
import { selectHeaders } from "../slices/headersSlice";

export const useQueryPostsQuery = (query? :string) => {
  // const token = useAppSelector(selectUserToken)

  const headers = useAppSelector(selectHeaders)

  const getPostsQuery = async () => {
    if(headers.headers.Authorization != null){
    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/posts?${query}`,headers)
      return data.posts
    }
  }

  return useQuery({
    queryKey: 'postsQuery',
    queryFn: getPostsQuery,
    staleTime: 0,
    // refetchOnWindowFocus: true,
    //cacheTime: 5000,
    // refetchInterval: 5000,
  })
}


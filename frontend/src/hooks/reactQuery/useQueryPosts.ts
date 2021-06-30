import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query'
import axios from 'axios'
import { PostData, User } from '../../types/types'
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../../app/hooks";
import { Auth0Provider } from '@auth0/auth0-react';
import { selectHeaders } from "../../slices/headersSlice";

export const useQueryPosts = () => {
  // const token = useAppSelector(selectUserToken)

  const headers = useAppSelector(selectHeaders)

  const getPosts = async () => {

    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/posts`)
      // ジャンルを配列に変換
      data.posts.map((v:any) => v.genre = v.genre.split(','))
      return data
  }

  return useQuery({
    queryKey: 'posts',
    queryFn: getPosts,
    staleTime: 30000,
    // refetchOnWindowFocus: true,
    //cacheTime: 5000,
    // refetchInterval: 5000,
  })
}
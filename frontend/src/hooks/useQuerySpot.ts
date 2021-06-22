import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query'
import axios from 'axios'
import { User } from '../types/types'
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../app/hooks";
import { Auth0Provider } from '@auth0/auth0-react';
import { selectUserToken } from "../slices/userToken";

export const useQueryPosts = () => {
  // const token = useAppSelector(selectUserToken)

  const token = useAppSelector(selectUserToken)

  const getPosts = async () => {

    let headers = 
    {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": 'application/json',
      // "sub": 'google-oauth2|106160814069089305764'
    }
    }

    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/spot/`)
      return data.posts
  }

  return useQuery({
    queryKey: 'posts',
    queryFn: getPosts,
    staleTime: 0,
    // refetchOnWindowFocus: true,
    //cacheTime: 5000,
    // refetchInterval: 5000,
  })

}


// place_idを取得する
// reduxのplace_idをセット
// place_idをカスタムフックで送信
// カスタムフックでをaixosで送る
// →

// 帰ってきたデータを表示
// データをaxiosで保存

import React,{VFC} from 'react'
import axios from 'axios'

import { useMutateSpot } from '../hooks/useMutateSpot'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectSpot } from '../slices/spotSlice'
import { selectPost } from '../slices/postSlice'
import { selectHeaders } from '../slices/headersSlice'
import { useAuth0 } from "@auth0/auth0-react";

const Test: VFC = () => {
  const { user, isAuthenticated, getAccessTokenSilently }:any = useAuth0();
  console.log(user)
  const headers = useAppSelector(selectHeaders)
  const Click = () =>{ 
    axios.get(`${process.env.REACT_APP_REST_URL}/profiles`)
    .then(res =>{
      console.log(res.data)
    })
  }

  const createClick = () => {
    const data:any = {
      nickname: 'モック',
      gender: '女性',
      introduction: '自己紹介2回目でーす',
      twitter_url: 'https//',
      instagram_url: '',
      avatar: ''
    }

    axios.put(`${process.env.REACT_APP_REST_URL}/profiles/1`,data,headers,)
    .then(res =>{
      console.log(res)
    })
  }

  return (
    <div>
      <button onClick={Click}>ゲット</button>
      <br/>
      <button onClick={createClick}>クリエイト</button>
    </div>
  )
}

export default Test

import React, {VFC} from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useQueryPosts } from '../../hooks/useQueryPosts'
import { selectUserToken,setToken } from "../../slices/userToken";
import { useAppSelector,useAppDispatch } from "../../app/hooks";
import { useEffect } from 'react';
import axios from 'axios';
import {PostCard} from './PostCard';



const Post: VFC = () => {    
  const { status, data } = useQueryPosts()

    if (status === 'loading') return <div>{'Loading...'}</div>
    if (status === 'error') return <div>{'Error'}</div>
    console.log(data)
    console.log(status)
    
  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((item:any) => (
        <div className="m-5 w-2/8">
          <PostCard item={item}/>
        </div>
      ))}
    </div>
  )
}

export default Post

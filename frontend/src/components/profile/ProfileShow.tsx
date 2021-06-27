import React from 'react'
import { useQueryProfileShow } from '../../hooks/reactQuery/useQueryProfileShow'
import { PostCard } from '../posts/PostCard'

import { useAppSelector } from '../../app/hooks'
import { selectHeaders } from '../../slices/headersSlice'
import { useMutatePost } from '../../hooks/castomHook/useMutatePost'
import { useState ,useEffect} from 'react'
import { selectQueryPost } from '../../slices/postSlice'
import { useAuth0 } from '@auth0/auth0-react'
import {  Link } from "react-router-dom";
import defaultPhoto from '../../profile_default.png'

const ProfileShow = ({match}:any) => {

  const currentUserId = localStorage.getItem('currentUserId')
  const queryPosts = useAppSelector(selectQueryPost)

  const {queryPostMutation} = useMutatePost()
  const id = match.params.profileId

  useEffect(() => {
    queryPostMutation.mutate(`profile_id=${id}`)
  }, [])
  
  const { status, data } = useQueryProfileShow(id)

  if (status === 'loading') return (<div></div>  )
  if (status === 'error') return <div>{'Error'}</div>

  return (
    
    <div className='w-full py-2 lg:mx-auto'>
      <div className='border-2 border-gray-300 relative cursor-pointer w-32 h-32 block mt-10 rounded-full mx-auto' >
      {data.profile.avatar_url == null ?
        <img src={defaultPhoto} className='rounded-full' alt="" />
        :
        // <img src={defaultPhoto} className='rounded-full' alt="" />
        <img src={data.profile.avatar_url} className='rounded-full' alt="" />
        
    }
    </div>
      {/* <div className='bg-blue-300 w-32 h-32 rounded-full mt-10 mx-auto'></div> */}
      <p className='mt-4 text-center'>{data.profile.nickname}</p>
      <p className='mt-4 text-center'>{data.profile.introduction}</p>
      
      {currentUserId == id ?
      <Link to={`/profile/edit/${id}`}
      className='mx-auto block m-4 px-4 py-2 bg-gray-500 font-bold text-white rounded w-20 text-center'>編集</Link>
      // <Link to={`/profile/edit/${id}`} className='mx-auto block m-4 px-4 py-2 bg-gray-500 font-bold text-white rounded w-20 text-center'>編集</Link>
      :
      <button className='mx-auto block mt-4 px-4 py-2 bg-blue-500 font-bold text-white rounded'>フォローする</button>
      }
      <div className='border-t border-b h-40 mt-4 flex text-center align-center items-center'>
        <p className='w-1/3'>投稿{queryPosts.posts?.length}件</p>
        <p className='w-1/3'>フォロワー0人</p>
        <p className='w-1/3'>フォロー0人</p>
      </div>

      <div className="flex flex-wrap justify-center">
        {queryPosts.posts?.map((item:any) => (
            <PostCard item={item}/>
        ))}
      </div>
    </div>

  )
}

export default ProfileShow

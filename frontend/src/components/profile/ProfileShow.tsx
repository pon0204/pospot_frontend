import React from 'react'
import { useQueryProfileShow } from '../../hooks/useQueryProfileShow'
import { PostCard } from '../posts/PostCard'

import { useAppSelector } from '../../app/hooks'
import { selectHeaders } from '../../slices/headersSlice'
import { useMutatePost } from '../../hooks/useMutatePost'
import { useState ,useEffect} from 'react'
import { selectQueryPost } from '../../slices/postSlice'
import { useAuth0 } from '@auth0/auth0-react'

const ProfileShow = ({match}:any) => {

  // ログインしているユーザーがtokenのユーザーと一致しているかを判定する
  // user_idを常に保持
  // 
  // 
  // 
  // 
  const userId = localStorage.getItem('currentUserId')  
  console.log(userId)

  const queryPosts = useAppSelector(selectQueryPost)

  const {queryPostMutation} = useMutatePost()
  const id = match.params.profileId

  console.log(queryPosts)

  useEffect(() => {
    queryPostMutation.mutate(`profile_id=${id}`)
  }, [])

  const { status, data } = useQueryProfileShow(id)

  console.log(data)

  if (status === 'loading') return (<div>{'Loading'}</div>  )
  if (status === 'error') return <div>{'Error'}</div>
  
  return (
    <div className='w-full py-2 lg:mx-auto'>
      <div className='bg-blue-300 w-32 h-32 rounded-full mt-10 mx-auto'></div>
      <p className='mt-4 text-center'>{data.profile.nickname}</p>
      <button className='mx-auto block mt-4 px-4 py-2 bg-blue-500 font-bold text-white rounded-t'>フォローする</button>
      <div className='border-t border-b h-40 mt-4 flex text-center align-center items-center'>
        <p className='w-1/3'>投稿6件</p>
        <p className='w-1/3'>フォロワー100人</p>
        <p className='w-1/3'>フォロー100人</p>
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

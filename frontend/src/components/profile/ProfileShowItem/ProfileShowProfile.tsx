import React from 'react'
import { useQueryProfileShow } from '../../../hooks/reactQuery/useQueryProfileShow'
import defaultPhoto from '../../../profile_default.png'
import { Link } from 'react-router-dom'
import { useMutateFollow } from '../../../hooks/castomHook/useMutateFollow'
import { useAppSelector } from '../../../app/hooks'
import { selectFollowsCount } from '../../../slices/followSlice'
import { useQueryClient } from 'react-query'

const ProfileShowProfile = (id:any) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const {status ,data} = useQueryProfileShow(id.id)
  const {createFollowMutation,deleteFollowMutation} = useMutateFollow()

  const queryClient = useQueryClient()
  const followersIds = queryClient.getQueryData<any>('follows')

  const currentUserFollowing = followersIds?.followers?.some((v:any) => v.id == currentUserId)

  if (status === 'loading') return (<div style={{height: 304}}></div>  )
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <div>
      <div className='border-2 border-gray-300 relative cursor-pointer w-32 h-32 block mt-10 rounded-full mx-auto' >
      {data.profile.avatar_url == null ?
      <img src={defaultPhoto} className='rounded-full' alt="" />
        :
      <img src={data.profile.avatar_url} className='rounded-full' alt="" />
      }
      </div>
      <p className='mt-4 text-center'>{data.profile.nickname}</p>
      <p className='mt-4 text-center'>{data.profile.introduction}</p>
      {currentUserId == id.id ?
      <Link to={`/profile/edit/${id.id}`}
      className='mx-auto block m-4 px-4 py-2 bg-gray-500 font-bold text-white rounded w-20 text-center'>編集</Link>
      // <Link to={`/profile/edit/${id}`} className='mx-auto block m-4 px-4 py-2 bg-gray-500 font-bold text-white rounded w-20 text-center'>編集</Link>
      :
      currentUserFollowing == undefined ?
      <div></div>
      :
      currentUserFollowing ? 
      <button onClick={() => {deleteFollowMutation.mutate(id.id)}} className='mx-auto block mt-4 px-4 py-2 bg-blue-200 font-bold text-gray-600 rounded'>フォロー解除</button>   
      :
      <button onClick={() => {createFollowMutation.mutate(id.id)}} className='mx-auto block mt-4 px-4 py-2 bg-blue-500 font-bold text-white rounded'>フォローする</button>

      }    
    </div>
  )
}

export default ProfileShowProfile
 
import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useMutateFollow } from '../../../hooks/castomHook/useMutateFollow'
import { useQueryProfileShow } from '../../../hooks/reactQuery/useQueryProfileShow'
import defaultPhoto from '../../../image/profile_default.png'
import { selectLoading, setApiLoading } from '../../../slices/apiSlice'
import { FollowersId } from '../../../types/types'

const ProfileShowProfile = (id:any) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const {status ,data} = useQueryProfileShow(id.id)
  const {createFollowMutation,deleteFollowMutation} = useMutateFollow()
  const {loginWithPopup } = useAuth0();
  const queryClient = useQueryClient()
  const followersIds = queryClient.getQueryData<any>('follows')
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)

  const currentUserFollowing = followersIds?.followers?.some((follower:FollowersId) => follower.id == currentUserId)

  if (status === 'loading') return (<div style={{height: 304}}></div>  )
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <div>
      <div className='border-2 border-gray-300 relative cursor-pointer w-32 h-32 block mt-10 rounded-full mx-auto' >
      {data.profile.avatar_url == null ?
      <img src={defaultPhoto} className='rounded-full' alt="" />
        :
      <img src={data.profile.avatar_url} className='w-32 h-32 rounded-full' alt="" />
      }
      </div>
      <p className='mt-4 text-center'>{data.profile.nickname}</p>
      <p className='mt-4 text-center w-2/3 mx-auto'>{data.profile.introduction}</p>    
      {
      loading ? 
      <div className='mx-auto block w-32 h-10 bg-blue-200 font-bold rounded relative'>
        <div className='absolute pt-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><CircularProgress size='30px'/></div>
      </div>
      :currentUserId == id.id ?
      <Link to={`/profile/edit/${id.id}`}
      className='mx-auto block m-4 px-4 py-2 bg-gray-500 font-bold text-white rounded w-20 text-center'>編集</Link>
      :
      currentUserFollowing == undefined ?
      <div className='mt-4 px-4 py-2 h-4'></div>
      :
      currentUserFollowing ? 
      <button onClick={() => {
        if(currentUserId){
        dispatch(setApiLoading())
        deleteFollowMutation.mutate(id.id)
        }else{
          loginWithPopup()
        }
      }} className='mx-auto block mt-4 px-4 py-2 bg-blue-200 font-bold text-gray-600 rounded'>フォロー解除</button>   
      :
      <button onClick={() => {
        if(currentUserId){
        dispatch(setApiLoading())
        createFollowMutation.mutate(id.id)
        }else{
          loginWithPopup()
        }
        }}
        className='mx-auto block mt-4 px-4 py-2 bg-blue-500 font-bold text-white rounded'>フォローする</button>
      }    
    </div>
  )
}

// followボタンを押したらローディング or 即時変換
// 即時変換するには
// stateがtrueならフォローボタン falseなら解除ボタン
//
//

export default ProfileShowProfile

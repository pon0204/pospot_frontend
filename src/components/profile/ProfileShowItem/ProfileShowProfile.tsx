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

const ProfileShowProfile = (id: any) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const { status, data } = useQueryProfileShow(id.id)
  const { createFollowMutation, deleteFollowMutation } = useMutateFollow()
  const { loginWithPopup } = useAuth0()
  const queryClient = useQueryClient()
  const followersIds = queryClient.getQueryData<any>('follows')
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)

  const currentUserFollowing = followersIds?.followers?.some(
    (follower: FollowersId) => follower.id == currentUserId
  )

  if (status === 'loading') return <div style={{ height: 304 }}></div>
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <div>
      <div className="relative block w-32 h-32 mx-auto mt-10 border-2 border-gray-300 rounded-full cursor-pointer">
        {data.profile.avatar_url == null ? (
          <img src={defaultPhoto} className="rounded-full" alt="" />
        ) : (
          <img
            src={data.profile.avatar_url}
            className="w-32 h-32 rounded-full"
            alt=""
          />
        )}
      </div>
      <p className="mt-4 text-center">{data.profile.nickname}</p>
      <p className="w-2/3 mx-auto mt-4 text-center">
        {data.profile.introduction}
      </p>
      {loading ? (
        <div className="relative block w-32 h-10 mx-auto font-bold bg-blue-200 rounded mt-4">
          <div className="top-1/2 left-1/2 absolute pt-1 transform -translate-x-1/2 -translate-y-1/2">
            <CircularProgress size="30px" />
          </div>
        </div>
      ) : currentUserId == id.id ? (
        <Link
          to={`/profile/edit/${id.id}`}
          className="block w-20 px-4 py-2 m-4 mx-auto font-bold text-center text-white bg-gray-500 rounded"
        >
          編集
        </Link>
      ) : currentUserFollowing == undefined ? (
        <div className="h-4 px-4 py-2 mt-4"></div>
      ) : currentUserFollowing ? (
        <button
          onClick={() => {
            if (currentUserId) {
              dispatch(setApiLoading())
              deleteFollowMutation.mutate(id.id)
            } else {
              loginWithPopup()
            }
          }}
          className="block px-4 py-2 mx-auto mt-4 font-bold text-gray-600 bg-blue-200 rounded"
        >
          フォロー解除
        </button>
      ) : (
        <button
          onClick={() => {
            if (currentUserId) {
              dispatch(setApiLoading())
              createFollowMutation.mutate(id.id)
            } else {
              loginWithPopup()
            }
          }}
          className="block px-4 py-2 mx-auto mt-4 font-bold text-white bg-blue-500 rounded"
        >
          フォローする
        </button>
      )}
    </div>
  )
}

// followボタンを押したらローディング or 即時変換
// 即時変換するには
// stateがtrueならフォローボタン falseなら解除ボタン
//
//

export default ProfileShowProfile

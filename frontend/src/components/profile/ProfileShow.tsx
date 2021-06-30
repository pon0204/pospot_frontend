import React from 'react'
import ProfileShowProfile from './ProfileShowItem/ProfileShowProfile'
import ProfileShowPosts from './ProfileShowItem/ProfileShowPosts'
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows'
import { selectFollowsCount } from '../../slices/followSlice'
import { useAppSelector } from '../../app/hooks'

const ProfileShow = ({match}:any) => {
  // console.log(data)
  const id = match.params.profileId
  const {status,data} = useQueryFollows(id)
  const follow = useAppSelector(selectFollowsCount)

  return (  
    <div className='w-full py-2 lg:mx-auto'>
      <ProfileShowProfile id={id}/>
      <ProfileShowPosts id={id}/>
    </div>
  )
}

export default ProfileShow

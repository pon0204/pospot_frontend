import React from 'react'
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows'
import ProfileShowPosts from './ProfileShowItem/ProfileShowPosts'
import ProfileShowProfile from './ProfileShowItem/ProfileShowProfile'

const ProfileShow = ({match}:any) => {
  const id = match.params.profileId
  useQueryFollows(id)
  
  return (  
    <div className='w-full py-2 lg:mx-auto'>
      <ProfileShowProfile id={id}/>
      <ProfileShowPosts id={id}/>
    </div>
  )
}

export default ProfileShow

import React from 'react'
import ProfileShowProfile from './ProfileShowProfile'
import ProfileShowPosts from './ProfileShowPosts'

const ProfileShow = ({match}:any) => {
  // console.log(data)
  const id = match.params.profileId
  return (  
    <div className='w-full py-2 lg:mx-auto'>
      <ProfileShowProfile id={id}/>
      <ProfileShowPosts id={id}/>
    </div>

  )
}

export default ProfileShow

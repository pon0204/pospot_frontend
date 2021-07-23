import AddIcon from '@material-ui/icons/Add'
import React from 'react'
import { Link } from 'react-router-dom'
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows'
import ProfileShowPosts from './ProfileShowItem/ProfileShowPosts'
import ProfileShowProfile from './ProfileShowItem/ProfileShowProfile'

const ProfileShow = ({ match }: any) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const id = match.params.profileId
  useQueryFollows(id)

  return (
    <div className="pb-28 lg:mx-auto w-full pt-2">
      <ProfileShowProfile id={id} />
      <ProfileShowPosts id={id} />
      {currentUserId == id && (
        <div className="bottom-20 right-6 lg:right-20 bg-opacity-90 fixed z-50 bg-blue-900 rounded-full">
          <Link to="/posts/new" className="block p-4">
            <AddIcon style={{ fontSize: 52, color: 'white' }} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProfileShow

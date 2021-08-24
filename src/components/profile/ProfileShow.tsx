import AddIcon from '@material-ui/icons/Add'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useGaTrackPage from '../../hooks/castomHook/useGaTrackPage'
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows'
import ProfileShowPosts from './ProfileShowItem/ProfileShowPosts'
import ProfileShowProfile from './ProfileShowItem/ProfileShowProfile'

interface Props {
  match: {params:{profileId:string}}
}

const ProfileShow = ({ match }: Props) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const id = match.params.profileId
  const location = useLocation()
  useGaTrackPage(location.pathname)
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

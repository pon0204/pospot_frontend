import { useAuth0 } from '@auth0/auth0-react'
import AppBar from '@material-ui/core/AppBar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useMutateUser } from '../hooks/castomHook/useMutateUser'
import defaultPhoto from '../image/profile_default.png'
import { setHeaders } from '../slices/headersSlice'
import { selectAvatar, setCurrentAvatar } from '../slices/profileSlice'

export default function Header() {
  const { isAuthenticated, logout, loginWithPopup } = useAuth0()
  const dispatch = useAppDispatch()
  const { getAccessTokenSilently } = useAuth0()
  const { userIdMutation } = useMutateUser()
  const currentUserId = localStorage.getItem('currentUserId')
  const avatar = useAppSelector(selectAvatar)

  const removeUserId = () => {
    localStorage.removeItem('currentUserId')
  }

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({})
        dispatch(setHeaders(accessToken))
        userIdMutation.mutate()
        axios
          .get(`${process.env.REACT_APP_REST_URL}/profiles/${currentUserId}`)
          .then((res) =>
            dispatch(setCurrentAvatar(res.data.profile.avatar_url))
          )
      } catch (e) {
        console.log(e.message)
        removeUserId()
      }
    }
    getToken()
  }, [isAuthenticated])

  return (
    <div className='relative'>
      <AppBar position="fixed">
        <div className="h-14 flex justify-between p-4">
          <Link to="/posts">投稿一覧</Link>
          {isAuthenticated ? (
            <div className="flex items-center">
              <Link to={`/profile/${currentUserId}`}>
                {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    className="block w-10 h-10 mr-4 rounded-full"
                  />
                ) : (
                  <img
                    src={defaultPhoto}
                    alt=""
                    className="block w-10 h-10 mr-4 rounded-full"
                  />
                )}
              </Link>
              <button
                className="text-right"
                color="inherit"
                onClick={() => {
                  logout({ returnTo: window.location.origin })
                  removeUserId()
                }}
              >
                ログアウト
              </button>
            </div>
          ) : (
            <button
              className="text-right"
              color="inherit"
              onClick={loginWithPopup}
            >
              ログイン
            </button>
          )}
        </div>
      </AppBar>
    </div>
  )
}

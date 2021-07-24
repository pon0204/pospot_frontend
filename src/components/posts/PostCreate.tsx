import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@material-ui/core'
import { useEffect, VFC } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import useGaTrackPage from '../../hooks/castomHook/useGaTrackPage'
import { selectLoading } from '../../slices/apiSlice'
import { FormAutoComp } from './PostCreateItem/FormAutoComp'
import FormButton from './PostCreateItem/FormButton'
import FormFile from './PostCreateItem/FormFile'
import { FormRadio } from './PostCreateItem/FormRadio'
import { FormSpot } from './PostCreateItem/FormSpot'
import InputForm from './PostCreateItem/InputFrom'
import SpotDetail from './PostCreateItem/SpotDetail'

const PostCreate: VFC = () => {
  const currentUserId = localStorage.getItem('currentUserId')
  const loading = useAppSelector(selectLoading)
  const { isAuthenticated, loginWithPopup } = useAuth0()
  const location = useLocation()
  useGaTrackPage(location.pathname)

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithPopup()
    }
  }, [])

  if (!isAuthenticated) {
    return <p className="mt-10 text-center">ログインしてください</p>
  }
  return (
    <div className="md:w-1/2 md:mx-auto w-full px-2 py-4">
      {loading && (
        <div className="bg-opacity-30 fixed top-0 left-0 w-full h-full bg-white">
          <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
            <CircularProgress style={{ fontSize: 52 }} />
          </div>
        </div>
      )}
      <FormFile />
      <InputForm />
      <FormAutoComp />
      <FormRadio />
      <FormSpot />
      <SpotDetail />
      <FormButton />
    </div>
  )
}

export default PostCreate

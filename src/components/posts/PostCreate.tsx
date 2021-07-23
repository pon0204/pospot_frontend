import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@material-ui/core'
import { useEffect, VFC } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectLoading } from '../../slices/apiSlice'
import { FormAutoComp } from './PostCreateItem/FormAutoComp'
import FormButton from './PostCreateItem/FormButton'
import FormFile from './PostCreateItem/FormFile'
import { FormRadio } from './PostCreateItem/FormRadio'
import { FormSpot } from './PostCreateItem/FormSpot'
import InputForm from './PostCreateItem/InputFrom'
import SpotDetail from './PostCreateItem/SpotDetail'

const PostForm: VFC = () => {
  const currentUserId = localStorage.getItem('currentUserId')
  const loading = useAppSelector(selectLoading)
  const { isAuthenticated, loginWithPopup } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithPopup()
    }
  }, [])

  if (!isAuthenticated) {
    return <p className="text-center mt-10">ログインしてください</p>
  }
  return (
    <div className="w-full px-2 md:w-1/2 md:mx-auto py-4">
      {loading && (
        <div className="fixed bg-white bg-opacity-30 w-full h-full top-0 left-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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

export default PostForm

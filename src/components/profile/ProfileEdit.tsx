import { useAuth0 } from '@auth0/auth0-react'
import CircularProgress from '@material-ui/core/CircularProgress'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useQueryProfileShow } from '../../hooks/reactQuery/useQueryProfileShow'
import { selectLoading } from '../../slices/apiSlice'
import FormButton from './FormAsset/FormButton'
import FormFile from './FormAsset/FormFile'
import { FormRadio } from './FormAsset/FormRadio'
import InputForm from './FormAsset/InputFrom'

const ProfileEdit = ({ match }: any) => {
  const id = match.params.profileId
  const currentUserId = localStorage.getItem('currentUserId')
  const { status, data } = useQueryProfileShow(id)
  const loading = useAppSelector(selectLoading)
  const { isAuthenticated, loginWithPopup } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithPopup()
    }
  }, [])

  if (!isAuthenticated) {
    return <p className="mt-10 text-center">ログインしてください</p>
  }

  if (status === 'loading')
    return (
      <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
        <CircularProgress />
      </div>
    )

  if (data.profile.id != currentUserId) {
    return <div>ログイン中ユーザーと異なります</div>
  }
  return (
    <div className="lg:w-1/2 mx-auto">
      {loading && (
        <div className="bg-opacity-30 fixed top-0 left-0 w-full h-full bg-white">
          <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
            <CircularProgress style={{ fontSize: 52 }} />
          </div>
        </div>
      )}
      <FormFile />
      <p className="mt-4 text-center">{data.profile.nickname}</p>
      <FormRadio />
      <InputForm />
      <FormButton />
    </div>
  )
}

export default ProfileEdit

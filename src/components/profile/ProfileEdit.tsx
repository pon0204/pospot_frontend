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
    return <p className="text-center mt-10">ログインしてください</p>
  }

  if (status === 'loading')
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CircularProgress />
      </div>
    )

  if (data.profile.id != currentUserId) {
    return <div>ログイン中ユーザーと異なります</div>
  }
  return (
    <div className="lg:w-1/2 mx-auto">
      {loading && (
        <div className="fixed bg-white bg-opacity-30 w-full h-full top-0 left-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CircularProgress style={{ fontSize: 52 }} />
          </div>
        </div>
      )}
      <FormFile />
      <p className="text-center mt-4">{data.profile.nickname}</p>
      <FormRadio />
      <InputForm />
      <FormButton />
    </div>
  )
}

export default ProfileEdit

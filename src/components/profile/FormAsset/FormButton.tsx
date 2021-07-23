import { VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useMutateUser } from '../../../hooks/castomHook/useMutateUser'
import { setApiLoading } from '../../../slices/apiSlice'
import { selectProfile } from '../../../slices/profileSlice'

const FormButton: VFC = () => {
  const editedProfile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  const { profileUpdateMutation } = useMutateUser()

  const profileUpdateClick = () => {
    const data: any = new FormData()
    data.append('nickname', editedProfile.nickname)
    data.append('introduction', editedProfile.introduction)
    data.append('gender', editedProfile.gender)
    data.append('avatar', editedProfile.avatar)
    dispatch(setApiLoading())
    profileUpdateMutation.mutate(data)
  }

  if (
    editedProfile.nickname.length >= 51 ||
    editedProfile.introduction.length >= 201
  ) {
    return (
      <button
        disabled
        className="cursor-default bg-red-300 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
      >
        エラーの項目があります
      </button>
    )
  }

  return (
    <button
      className="bg-red-500 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
      onClick={profileUpdateClick}
    >
      更新
    </button>
  )
}

export default FormButton

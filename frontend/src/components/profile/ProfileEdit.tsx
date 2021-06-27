import React from 'react'
import { useLocation } from 'react-router-dom';
import InputForm from './FormAsset/InputFrom';
import { FormRadio } from './FormAsset/FormRadio';
import FormFile from './FormAsset/FormFile'
import FormButton from './FormAsset/FormButton';
import { useAppSelector } from '../../app/hooks';
import { selectProfile} from '../../slices/profileSlice';
import { useQueryProfileShow } from '../../hooks/reactQuery/useQueryProfileShow';
const ProfileEdit = ({match}:any) => {
  // const profile = useAppSelector(selectProfile)
  const currentUserId:any = localStorage.getItem('currentUserId')
  const {status,data} = useQueryProfileShow(currentUserId)
  console.log(data)


  if (status === 'loading') return (<div>

  </div>  )

  if(data.profile.id != currentUserId){
    return(
    <div>ログイン中ユーザーと異なります</div>
    )
  }
    return (
      <div className='lg:w-1/2 mx-auto'>
        <FormFile/>
        <p className='text-center mt-4'>{data.profile.nickname}</p>
        <FormRadio/>
        <InputForm/>
        <FormButton/>
      </div>
  )
}

export default ProfileEdit

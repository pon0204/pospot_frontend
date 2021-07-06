import React from 'react';
import { useQueryProfileShow } from '../../hooks/reactQuery/useQueryProfileShow';
import FormButton from './FormAsset/FormButton';
import FormFile from './FormAsset/FormFile';
import { FormRadio } from './FormAsset/FormRadio';
import InputForm from './FormAsset/InputFrom';

const ProfileEdit = ({match}:any) => {
  const id = match.params.profileId
  const currentUserId = localStorage.getItem('currentUserId')
  const {status,data} = useQueryProfileShow(id)

  if (status === 'loading') return (<div></div>  )

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

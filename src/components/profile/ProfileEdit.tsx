import React from 'react';
import { useQueryProfileShow } from '../../hooks/reactQuery/useQueryProfileShow';
import FormButton from './FormAsset/FormButton';
import FormFile from './FormAsset/FormFile';
import { FormRadio } from './FormAsset/FormRadio';
import InputForm from './FormAsset/InputFrom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectLoading } from '../../slices/apiSlice';
import { useAppSelector } from '../../app/hooks';

const ProfileEdit = ({match}:any) => {
  const id = match.params.profileId
  const currentUserId = localStorage.getItem('currentUserId')
  const {status,data} = useQueryProfileShow(id)
  const loading = useAppSelector(selectLoading)

  if (status === 'loading') return (<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><CircularProgress/></div>)

  if(data.profile.id != currentUserId){
    return(
    <div>ログイン中ユーザーと異なります</div>
    )
  }
    return (
      <div className='lg:w-1/2 mx-auto'>
        {loading && 
        <div className='fixed bg-white bg-opacity-30 w-full h-full top-0 left-0'>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <CircularProgress style={{fontSize: 52}}/>
          </div>
        </div>
        }
        <FormFile/>
        <p className='text-center mt-4'>{data.profile.nickname}</p>
        <FormRadio/>
        <InputForm/>
        <FormButton/>
      </div>
  )
}

export default ProfileEdit

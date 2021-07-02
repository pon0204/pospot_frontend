
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import React, { useState, VFC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProfile, setEditedProfile } from '../../../slices/profileSlice';


const FormFile:VFC = () => {

  const [fileUrl, setFileUrl] = useState<string>('');
  const editedProfile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const imageChange = (event:any) => {
    const image = event.target.files[0];
    const imageUrl:any = URL.createObjectURL(image);
    setFileUrl(imageUrl)
    dispatch(setEditedProfile({ ...editedProfile, avatar_url: image}))
  }

  return (
    <div>
    <label htmlFor='file' className='border-2 border-gray-300 relative cursor-pointer w-24 h-24 block mt-10 rounded-full mx-auto' >
      {fileUrl ?
        <img src={fileUrl} className='rounded-full' alt="" />
      :
      <div className='relative'>
        <img src={editedProfile.avatar_url} className='opacity-50' alt=''/>
        <AddAPhotoIcon className='absolute top-8 right-8' style={{fontSize: 32}}/>
        {/* <img src={defaultPhoto} className='rounded-full' alt="" /> */}
      </div>
    }
    </label>
        <input className='hidden' onChange={imageChange} type="file" id="file" name="file" accept="image/png,image/jpg"/>
    </div>
  )
}

export default FormFile

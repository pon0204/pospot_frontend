
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Box} from '@material-ui/core'
import Button from '@material-ui/core/Button' 
import axios from 'axios';

import React, {VFC,useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setEditedPost, selectPost } from '../../../slices/postSlice'
import defaultPhoto from '../../../profile_default.png'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { selectProfile, setEditedProfile } from '../../../slices/profileSlice';

const FormFile:VFC = () => {

  const [fileUrl, setFileUrl] = useState<string>('');
  const editedProfile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const imageChange = (event:any) => {
    const image = event.target.files[0];
    const imageUrl:any = URL.createObjectURL(image);
    setFileUrl(imageUrl)
    dispatch(setEditedProfile({ ...editedProfile, avatar: image}))
  }
  console.log(editedProfile)

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

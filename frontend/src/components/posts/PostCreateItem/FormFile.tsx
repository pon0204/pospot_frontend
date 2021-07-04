import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import React, { useState, VFC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPost, setEditedPost } from '../../../slices/postSlice';

const FormFile:VFC = () => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  const imageChange = (event:any) => {
    const image = event.target.files[0];
    const imageUrl:any = URL.createObjectURL(image);
    setFileUrl(imageUrl)
    dispatch(setEditedPost({ ...editedPost, eyecatch: image}))
  }

  return (
    <div>
    {fileUrl ? 
    <div>
    <label htmlFor='file' className='text-center py-1 border-4 border-light-blue-500 w-full block cursor-pointer'>
    <AddAPhotoIcon className='' style={{fontSize: 24}}/>アイキャッチ画像変更
    </label>
    <img src={fileUrl} className='w-full my-4' style={{height:250}}/>
    </div>
    :
    <label htmlFor='file' className='border-dashed border-4 border-light-blue-500 w-full block cursor-pointer relative' style={{height: '250px'}}>
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <AddAPhotoIcon className='' style={{fontSize: 32}}/>
    <p className='ml-1 pt-1 inline-block'>アイキャッチ画像</p>
    </div>
    </label>
  }
  <input className='hidden' onChange={imageChange} type="file" id="file" name="file" accept="image/png,image/jpg"/>
    </div>
  )
}

export default FormFile

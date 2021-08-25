import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import imageCompression from 'browser-image-compression'
import React, { useState, VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectProfile, setEditedProfile } from '../../../slices/profileSlice'

const FormFile: VFC = () => {
  const [fileUrl, setFileUrl] = useState<string>('')
  const editedProfile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const compressOption = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 128,
  }

  const imageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
    const image = event.target.files[0]
    const imageUrl: string = URL.createObjectURL(image)
    const compressFile = await imageCompression(image, compressOption)
    setFileUrl(imageUrl)
    dispatch(setEditedProfile({ ...editedProfile, avatar: compressFile }))
    }
  }

  return (
    <div>
      <label
        htmlFor="file"
        className="relative block w-24 h-24 mx-auto mt-10 border-2 border-gray-300 rounded-full cursor-pointer"
      >
        {fileUrl ? (
          <img src={fileUrl} className="w-24 h-24 rounded-full" alt="" />
        ) : (
          <div className="relative">
            <img
              src={editedProfile.avatar_url}
              className="w-24 h-24 rounded-full opacity-50"
              alt=""
            />
            <AddAPhotoIcon
              className="top-8 right-8 absolute"
              style={{ fontSize: 32 }}
            />
            {/* <img src={defaultPhoto} className='rounded-full' alt="" /> */}
          </div>
        )}
      </label>
      <input
        className="hidden"
        onChange={imageChange}
        type="file"
        id="file"
        name="file"
        accept="image/png,image/jpg"
      />
    </div>
  )
}

export default FormFile

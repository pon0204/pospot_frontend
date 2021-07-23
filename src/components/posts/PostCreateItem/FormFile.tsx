import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import imageCompression from 'browser-image-compression'
import React, { useState, VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectPost, setEditedPost } from '../../../slices/postSlice'

const FormFile: VFC = () => {
  const [fileUrl, setFileUrl] = useState<string>('')
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  const compressOption = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1024,
  }

  const imageChange = async (event: any) => {
    const image = event.target.files[0]
    const compressFile = await imageCompression(image, compressOption)
    const imageUrl: any = URL.createObjectURL(image)
    setFileUrl(imageUrl)
    dispatch(setEditedPost({ ...editedPost, eyecatch: compressFile }))
  }

  return (
    <div>
      {fileUrl ? (
        <div>
          <label
            htmlFor="file"
            className="border-light-blue-500 block w-full py-1 text-center border-4 cursor-pointer"
          >
            <AddAPhotoIcon className="" style={{ fontSize: 24 }} />
            アイキャッチ画像変更
          </label>
          <img
            src={fileUrl}
            className="object-cover w-full my-4"
            style={{ height: 512 }}
          />
        </div>
      ) : (
        <label
          htmlFor="file"
          className="border-light-blue-500 relative block w-full border-4 border-dashed cursor-pointer"
          style={{ height: '250px' }}
        >
          <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
            <AddAPhotoIcon className="" style={{ fontSize: 32 }} />
            <p className="inline-block pt-1 ml-1">アイキャッチ画像</p>
          </div>
        </label>
      )}
      <input
        className="hidden"
        onChange={imageChange}
        type="file"
        id="file"
        name="file"
        accept="image/*"
      />
    </div>
  )
}

export default FormFile

import {VFC} from 'react'
import InputForm from './FormAsset/InputFrom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setEditedPost, selectPost } from '../../slices/postSlice'
import { useMutatePost } from '../../hooks/useMutatePost'
import FormButton from './FormAsset/FormButton'
import { FormRadio } from './FormAsset/FormRadio'
import { FormAutoComp } from './FormAsset/FormAutoComp'
import FormFile from './FormAsset/FormFile'
import { FormSpot } from './FormAsset/FormSpot'
import FormSpots from './FormAsset/FormSpots'

const PostForm: VFC = () => {
  // const editedPost = useAppSelector(selectPost)
  console.log('レンダリングしました')
  return (
    <div className="text-center w-2/6 mx-auto">
    <FormFile/>
    <InputForm/>
    <FormAutoComp/>
    <FormRadio/>
    <FormSpot/>
    <FormSpots/>
    <FormButton/>
    
    </div>
  )
}

export default PostForm

import {VFC} from 'react'
import InputForm from './FormAsset/InputFrom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setEditedPost, selectPost } from '../../slices/postSlice'
import { useMutatePost } from '../../hooks/useMutatePost'
import FormButton from './FormAsset/FormButton'

const PostForm: VFC = () => {
  // const editedPost = useAppSelector(selectPost)
  console.log('レンダリングしました')
  return (
    <div className="text-center">
    <InputForm/>
    <FormButton/>
    </div>
  )
}

export default PostForm

import {VFC} from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setEditedPost, selectPost } from '../../../slices/postSlice'
import { useMutatePost } from '../../../hooks/useMutatePost'
import Button from '@material-ui/core/Button';


const FormButton:VFC = () => {
  const editedPost:any = useAppSelector(selectPost)
  const dispatch = useAppDispatch()
  const { createPostMutation } = useMutatePost()

  const createClick = () => {
    createPostMutation.mutate(editedPost)
  }
  
  return (
    <button className="bg-red-500  mx-auto p-4 block text-white"
    onClick={createClick}
    >投稿</button>
  )
}

export default FormButton

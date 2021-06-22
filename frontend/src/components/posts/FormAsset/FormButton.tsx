import {VFC} from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setEditedPost, selectPost } from '../../../slices/postSlice'
import { setEditedSpot, selectSpot } from '../../../slices/spotSlice'
import { useMutatePost } from '../../../hooks/useMutatePost'
import Button from '@material-ui/core/Button';


const FormButton:VFC = () => {
  const editedPost = useAppSelector(selectPost)
  const editedSpot = useAppSelector(selectSpot)
  const dispatch = useAppDispatch()
  const { createPostMutation } = useMutatePost()

  const postCreateClick = () => {
    const data: any = new FormData()
    data.append('title',editedPost.title)
    data.append('caption',editedPost.caption)
    data.append('with',editedPost.with)
    data.append('genre',editedPost.genre)
    data.append('eyecatch',editedPost.eyecatch)

    createPostMutation.mutate(data)
  }
  console.log(editedSpot)
  
  if(editedSpot.spot.name != '') return (
    <button className="bg-red-500 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
    onClick={postCreateClick}
    >投稿</button>
  )
  return (
    <div></div>
  )
}

export default FormButton

import { VFC } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { useMutatePost } from '../../../hooks/castomHook/useMutatePost'
import { selectPost } from '../../../slices/postSlice'
import { selectSpot } from '../../../slices/spotSlice'

const FormButton:VFC = () => {
  const editedPost = useAppSelector(selectPost)
  const editedSpot = useAppSelector(selectSpot)
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

  if(editedSpot.spot.name != '') return (
    <button className="bg-red-500 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
    onClick={postCreateClick}
    >投稿</button>
  )
  return (
    <button disabled className="cursor-default bg-red-300 mt-3 rounded text-lg font-bold mx-auto w-2/6 p-4 block text-white"
    onClick={postCreateClick}
    >投稿</button>
  )
}

export default FormButton

import { VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useMutatePost } from '../../../hooks/castomHook/useMutatePost'
import { setApiLoading } from '../../../slices/apiSlice'
import { selectPost } from '../../../slices/postSlice'
import { selectSpot } from '../../../slices/spotSlice'

const FormButton: VFC = () => {
  const editedPost = useAppSelector(selectPost)
  const editedSpot = useAppSelector(selectSpot)
  const { createPostMutation } = useMutatePost()
  const dispatch = useAppDispatch()

  const postCreateClick = () => {
    dispatch(setApiLoading())
    const titleLengthOver = editedPost.title.length >= 101
    const captionLengthOver = editedPost.caption.length >= 401
    const genreLengthOver = editedPost.genre.split(',').length >= 4
    const eyeCatchNull = editedPost.eyecatch.name == ''

    if (
      titleLengthOver ||
      captionLengthOver ||
      genreLengthOver ||
      eyeCatchNull
    ) {
      alert(`
      ${titleLengthOver ? 'タイトルは50文字以下で入力してください' : ''}
      ${captionLengthOver ? '説明は400文字以下で入力してください' : ''}
      ${genreLengthOver ? 'ジャンルは3つまでで入力してください' : ''}
      ${eyeCatchNull ? 'アイキャッチ画像を登録してください' : ''}
      `)
    } else {
      const data: any = new FormData()
      data.append('title', editedPost.title)
      data.append('caption', editedPost.caption)
      data.append('with', editedPost.with)
      data.append('genre', editedPost.genre)
      data.append('eyecatch', editedPost.eyecatch)
      createPostMutation.mutate(data)
    }
  }
  //  editedSpot.spot.name != ''
  if (
    !editedSpot.spot.name ||
    !editedPost.title ||
    !editedPost.caption ||
    !editedPost.genre
  )
    return (
      <div>
        <button
          disabled
          className="block w-2/6 p-4 mx-auto mt-3 text-lg font-bold text-white bg-red-300 rounded cursor-default"
        >
          投稿
        </button>
        <p className="text-center text-red-500">未入力の項目があります</p>
      </div>
    )
  return (
    <button
      className="block w-2/6 p-4 mx-auto mt-3 text-lg font-bold text-white bg-red-500 rounded"
      onClick={postCreateClick}
    >
      投稿
    </button>
  )
}

export default FormButton

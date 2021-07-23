import axios from 'axios'
import { useMutation } from 'react-query'
import { useAppSelector } from '../../app/hooks'
import { selectHeaders } from '../../slices/headersSlice'

export const useMutateLike = () => {
  const headers = useAppSelector(selectHeaders)

  const createLikeMutation = useMutation((postId: number) =>
    axios.post(
      `${process.env.REACT_APP_REST_URL}/posts/${postId}/likes`,
      null,
      headers
    )
  )
  const deleteLikeMutation = useMutation((postId: number) =>
    axios.delete(
      `${process.env.REACT_APP_REST_URL}/posts/${postId}/likes/1`,
      headers
    )
  )
  return { createLikeMutation, deleteLikeMutation }
}

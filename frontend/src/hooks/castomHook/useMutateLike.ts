import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { selectHeaders } from "../../slices/headersSlice";
import { EditPost, PostData } from '../../types/types'

export const useMutateLike = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const headers = useAppSelector(selectHeaders)
  const currentUserId = localStorage.getItem('currentUserId')
  const createLikeMutation = useMutation(
    (postId:number) => 
      axios.post(`${process.env.REACT_APP_REST_URL}/posts/${postId}/likes`,null,headers),
    {
      onSuccess: (res,variables) => {
        const previousPosts = queryClient.getQueryData<any>('posts')
        const newLikes = [...previousPosts.posts[variables - 1].likes,res.data]
        previousPosts.posts[variables - 1].likes = newLikes
        if (previousPosts) {
          queryClient.setQueryData<any>('posts',previousPosts)
        }
      },
    }
  )

  const deleteLikeMutation = useMutation(
    (postId: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${postId}/likes/1`,headers),
    {
      onSuccess: (res,variables) => {
        const previousPosts = queryClient.getQueryData<any>('posts')
        const newLikes = previousPosts.posts[variables - 1].likes.filter((v:any) => v.user_id != currentUserId)

        previousPosts.posts[variables - 1].likes = newLikes
        if (previousPosts) {
          queryClient.setQueryData<any>('posts',previousPosts)
        }
      }
    }
  )
  return { createLikeMutation ,deleteLikeMutation}
}





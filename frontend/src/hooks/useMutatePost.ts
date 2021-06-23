import { EditPost, PostData } from '../types/types'
import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../app/hooks'
// import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from 'react-query'
import { selectSpot } from '../slices/spotSlice'
import { setEditedPost,resetEditedPost, setShowPost } from '../slices/postSlice'

import { useMutateSpot } from './useMutateSpot'

import { selectHeaders } from "../slices/headersSlice";


export const useMutatePost = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const headers = useAppSelector(selectHeaders)
  
  const editedSpot = useAppSelector(selectSpot)
  const { createSpotMutation } = useMutateSpot()
  
  const createPostMutation = useMutation(
    (post: EditPost) => 
      axios.post<PostData>(`${process.env.REACT_APP_REST_URL}/posts/`, post,headers),
    {
      onSuccess: (res) => {
        createSpotMutation.mutate({...editedSpot ,id: res.data.id})
        const previousPosts = queryClient.getQueryData<PostData[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<PostData[]>('posts', [
            ...previousPosts,
            res.data,
          ])
        }
        dispatch(resetEditedPost())
      },
    }
  )

  const deletePostMutation = useMutation(
    (id: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${id}`,headers),
    {
      onSuccess: (res,variables) => {
        const previousPosts = queryClient.getQueryData<PostData[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData(
            'posts',
            previousPosts.filter((post:PostData) => post.id !== variables)    
          )
        }
      }
    }
  )
  return { createPostMutation ,deletePostMutation}
}





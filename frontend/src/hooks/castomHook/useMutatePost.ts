import { EditPost, PostData } from '../../types/types'
import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../../app/hooks'
// import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from 'react-query'
import { selectSpot } from '../../slices/spotSlice'
import { setEditedPost,resetEditedPost, setShowPost } from '../../slices/postSlice'

import { useMutateSpot } from './useMutateSpot'

import { selectHeaders } from "../../slices/headersSlice";

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
        // 引数にポストのIDを渡している
        createSpotMutation.mutate({...editedSpot ,id: res.data.id})
        const newPosts = queryClient.getQueryData<PostData[]>('posts')
        if (newPosts) {
          queryClient.setQueryData<PostData[]>('posts', [
            ...newPosts,
            res.data,
          ])
        }
        // dispatch(resetEditedPost())
      },
    }
  )

  const deletePostMutation = useMutation(
    (id: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${id}`,headers),
    {
      onSuccess: (res,variables) => {
        console.log(variables)
        const previousPosts = queryClient.getQueryData<any>('posts')
        const filterPosts = previousPosts.posts.filter((post:any) => post.id != variables)
        const newPosts = {posts: filterPosts}
        queryClient.setQueryData('posts',newPosts)        
        }
      }
  )
  return { createPostMutation ,deletePostMutation}
}





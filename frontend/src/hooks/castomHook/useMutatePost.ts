import { EditPost, Post, Posts } from '../../types/types'
import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { selectSpot } from '../../slices/spotSlice'
import { useMutateSpot } from './useMutateSpot'
import { selectHeaders } from "../../slices/headersSlice";
import { resetEditedPost } from '../../slices/postSlice'

export const useMutatePost = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const headers = useAppSelector(selectHeaders)
  
  const editedSpot = useAppSelector(selectSpot)
  const { createSpotMutation } = useMutateSpot()

  const createPostMutation = useMutation(
    (post: EditPost) => 
      axios.post<Post>(`${process.env.REACT_APP_REST_URL}/posts/`, post,headers),
    {
      onSuccess: (res) => {
        // 引数にポストのIDを渡している
        createSpotMutation.mutate({...editedSpot ,id: res.data.id})
        // 投稿を再fetchしている
        queryClient.refetchQueries(['posts'],{active:true})        
        dispatch(resetEditedPost())
      },
    }
  )

  const deletePostMutation = useMutation(
    (id: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${id}`,headers),
    {
      onSuccess: (res,variables) => {
        const previousPosts = queryClient.getQueryData<Posts>('posts')

        if(previousPosts){
        const filterPosts = previousPosts.posts.filter((post:Post) => post.id != variables)
        const newPosts = {posts: filterPosts}
        queryClient.setQueryData('posts',newPosts)        
        }
        }
      }
  )
  return { createPostMutation ,deletePostMutation}
}





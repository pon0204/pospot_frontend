import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAppSelector } from '../../app/hooks'
import { selectHeaders } from "../../slices/headersSlice"
import { selectSpot } from '../../slices/spotSlice'
import { EditPost, Post } from '../../types/types'
import { useMutateSpot } from './useMutateSpot'

export const useMutatePost = () => {
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
        queryClient.resetQueries(['postsInfiniteNew'],{active:true})        
      },
    }
  )

  const deletePostMutation = useMutation(
    (id: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${id}`,headers),
    {
      onSuccess: (res,variables) => {
        queryClient.resetQueries(['postsInfiniteNew'],{active:true})        
        }
      }
  )
  return { createPostMutation ,deletePostMutation}
}





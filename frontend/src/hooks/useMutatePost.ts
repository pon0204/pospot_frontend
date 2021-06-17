import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
// import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from 'react-query'

import { useAppSelector } from "../app/hooks";
import { selectUserToken } from "../slices/userToken";


export const useMutatePost = () => {
  const queryClient = useQueryClient()
  const token = useAppSelector(selectUserToken)

    let headers = 
    {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": 'application/json',
      // "sub": 'google-oauth2|106160814069089305764'
    }
    }

  const createPostMutation = useMutation(
    (post) =>
      axios.post(`${process.env.REACT_APP_REST_URL}/posts/`, post,headers),
    {
      onSuccess: (res) => {
        const previousPosts = queryClient.getQueryData<any>('posts')
        if (previousPosts) {
          queryClient.setQueryData('posts', [
            ...previousPosts,
            res.data,
          ])
        }
        // dispatch(resetEditedTask())
      },
    }
  )

  const deletePostMutation = useMutation(
    (id: any) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${id}`,headers),
    {
      onSuccess: (res,variables) => {
        const previousPosts = queryClient.getQueryData<any>('posts')
        if (previousPosts) {
          queryClient.setQueryData(
            'posts',
            previousPosts.filter((post:any) => post.id !== variables)    
          )
        }
      }
    }
  )
  return { createPostMutation ,deletePostMutation }
}





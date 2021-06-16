import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
// import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from 'react-query'
// import { Task, EditTask } from '../types/types'


export const useMutatePost = () => {
  const queryClient = useQueryClient()

  const deletePostMutation = useMutation(
    (id: any) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${id}`),
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
  return { deletePostMutation }
}





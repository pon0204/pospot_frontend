import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useAppSelector } from '../../app/hooks';
import { selectHeaders } from "../../slices/headersSlice";
import { Post, Posts } from '../../types/types';

export const useMutateLike = () => {
  const queryClient = useQueryClient()
  const headers = useAppSelector(selectHeaders)
  const currentUserId = localStorage.getItem('currentUserId')

  const createLikeMutation = useMutation(
    (postId:number) => 
      axios.post(`${process.env.REACT_APP_REST_URL}/posts/${postId}/likes`,null,headers),
    {
      onSuccess: (res,variables) => {
        const newPosts = queryClient.getQueryData<Posts>('posts')
        // post_idがわかっている post_idが同じものにlikes(res.data)を加える
        if(newPosts){
        newPosts.posts.map((post:any) => {
          if(post.id == variables){
          post.likes = [...post.likes,res.data]
          }        
        })
          queryClient.setQueryData<Posts>('posts',newPosts)
      }
      },
    }
  )
  const deleteLikeMutation = useMutation(
    (postId: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${postId}/likes/1`,headers),
    {
      onSuccess: (res,variables) => {
        const newPosts = queryClient.getQueryData<Posts>('posts')
        if(newPosts){
        newPosts.posts.map((post:Post) => {
          if(post.id == variables){
            // likesの中に自分のuser_idがある場合は消去
            post.likes.map((like:any) => {
            if(like.user_id == currentUserId){
              delete like.user_id
            }
            })
          }          
        })
        queryClient.setQueryData<Posts>('posts',newPosts)
      }
    }
    }
  )
  return { createLikeMutation ,deleteLikeMutation}
}





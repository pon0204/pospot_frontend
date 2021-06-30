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
        const newPosts = queryClient.getQueryData<any>('posts')
        // post_idがわかっている post_idが同じものにlikes(res.data)を加える
        newPosts.posts.map((post:any) => {
          if(post.id == variables){
          post.likes = [...post.likes,res.data]
          }        
        })
        console.log(newPosts)
          queryClient.setQueryData<any>('posts',newPosts)
      },
    }
  )
  const deleteLikeMutation = useMutation(
    (postId: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/posts/${postId}/likes/1`,headers),
    {
      onSuccess: (res,variables) => {
        const newPosts = queryClient.getQueryData<any>('posts')
        const hoge = newPosts.posts.map((post:any) => {
          if(post.id == variables){
            // likesの中に自分のuser_idがある場合は消去
            post.likes.map((like:any,key:any) => {
            if(like.user_id == currentUserId){
              delete like.user_id
            }
            })
          }
        })
        console.log(hoge)
        console.log(newPosts)
        queryClient.setQueryData<any>('posts',newPosts)
      }
    }
  )
  return { createLikeMutation ,deleteLikeMutation}
}





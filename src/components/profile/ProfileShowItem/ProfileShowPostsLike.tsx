import React from 'react'
import { useQueryClient } from 'react-query'
import { Post } from '../../../types/types'
import { PostCardMemo } from '../../posts/PostCards/PostCard'

const ProfileShowPostsLike = (id:any) => {
  const queryClient = useQueryClient()
  const Posts:any = queryClient.getQueryData('posts')
  const likePosts = Posts?.posts?.filter((post:Post) => post.likes.some((like:any) => like.user_id == id.id) == true)

  return (
    <div className="flex flex-wrap justify-center pb-12">
      {likePosts?.map((item:Post) => (
        <PostCardMemo item={item}/>
      ))
      }
    </div>
  )
}

export default ProfileShowPostsLike

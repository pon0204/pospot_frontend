import React from 'react'
import { useQueryClient } from 'react-query'
import { Post } from '../../../types/types'
import { PostCardMemo } from '../../posts/PostCards/PostCard'

const ProfileShowPostsCurrent = (id:any) => {
  const queryClient = useQueryClient()
  const Posts:any = queryClient.getQueryData('posts')

  const currentPosts = Posts?.posts?.filter((v:Post) => v.user_id == id.id)
  return (
    <div className="flex flex-wrap justify-center pb-12">
     {currentPosts?.map((item:Post) => (
      <PostCardMemo item={item}/>
      ))
    }
  </div>
  )
}

export default ProfileShowPostsCurrent

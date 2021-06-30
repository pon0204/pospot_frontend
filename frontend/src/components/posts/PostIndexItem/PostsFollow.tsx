import React from 'react'
import { useQueryClient } from 'react-query'
import { useQueryFollows } from '../../../hooks/reactQuery/useQueryFollows'
import { PostCard } from '../PostCards/PostCard'
import CircularProgress from '@material-ui/core/CircularProgress';

const PostsFollow = () => {
  const currentUserId = localStorage.getItem('currentUserId')
  const {status,data} = useQueryFollows(currentUserId)
  const queryClient = useQueryClient()
  const postsAll = queryClient.getQueryData<any>('posts')

  // フォローしているユーザーIDが投稿のuser_idと一致しているかを確認
  const postsFollow = postsAll.posts.filter((v:any) => data?.followings.map((v:any) => v.id) == v.user_id )

  if (status === 'loading') return (<div className='absolute top-1/2 right-1/2'><CircularProgress/></div>)
  if (status === 'error') return (<div>{'Error'}</div>)

  return (
  <div className='py-12'>
    <h2 className='text-center text-xl font-bold mb-4'>フォロー投稿一覧</h2>
    <div className="flex flex-wrap justify-center">
      {postsFollow?.map((item:any) => (
        <PostCard item={item}/>
      ))}
    </div>
  </div>
  )
}

export default PostsFollow

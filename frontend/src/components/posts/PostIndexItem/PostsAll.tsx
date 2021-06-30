import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { PostCard } from '../PostCards/PostCard'
import CircularProgress from '@material-ui/core/CircularProgress';

const PostsAll:VFC = () => {
  const queryClient = useQueryClient()
  const postsAll = queryClient.getQueryData<any>('posts')
  console.log(postsAll)

  return (
    <div className='py-12'>
      <h2 className='text-center text-xl font-bold mb-4'>新着投稿一覧</h2>
      <div className="flex flex-wrap justify-center">
        {postsAll?.posts.map((item:any) => (
            <PostCard item={item}/>
        ))}
      </div>
    </div>
  )
}

export default PostsAll

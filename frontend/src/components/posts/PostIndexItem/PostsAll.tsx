import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { PostCard } from '../PostCards/PostCard'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAppSelector } from '../../../app/hooks';
import { useQueryPostsQuery } from '../../../hooks/reactQuery/useQueryPostsQuery';
import { selectQueryPostGenre } from '../../../slices/postSlice';
import { useEffect } from 'react';
import { useState } from 'react';

const PostsAll:VFC = () => {
  const queryClient = useQueryClient()
  const queryGenre = useAppSelector(selectQueryPostGenre)
  const [postsGenre,setPostGenre] = useState<any>()
  const postsAll = queryClient.getQueryData<any>('posts')

  useEffect(() => {
    if(queryGenre){
      // 絞り込むジャンルをセットし、フィルターをかける
      const postsGenreQuery = postsAll?.posts.filter((v:any) => v.genre.filter((v:any) => v == queryGenre) == queryGenre)
      setPostGenre(postsGenreQuery)
      console.log(postsAll,'ジャンルセット後')
    }
    console.log(postsAll,'ジャンルセット前')
    console.log(queryGenre)
  }, [queryGenre])

  return (
    <div className='py-12'>
      <h2 className='text-center text-xl font-bold mb-4'>新着投稿一覧</h2>
      <div className="flex flex-wrap justify-center">
      {queryGenre ? 
      postsGenre?.map((item:any) => (
          <PostCard item={item}/>
      ))
      :
      postsAll?.posts.map((item:any) => (
          <PostCard item={item}/>
        ))
      } 
      </div>
    </div>
  )
}

export default PostsAll

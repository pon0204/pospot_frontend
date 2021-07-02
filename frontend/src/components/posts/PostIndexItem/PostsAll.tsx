import { useEffect, useState, VFC } from 'react';
import { useQueryClient } from 'react-query';
import { useAppSelector } from '../../../app/hooks';
import { selectQueryGenre, selectQueryPlace } from '../../../slices/postSlice';
import { PostCard } from '../PostCards/PostCard';

const PostsAll:VFC = () => {
  const queryClient = useQueryClient()
  const queryGenre = useAppSelector(selectQueryGenre)
  const queryPlace = useAppSelector(selectQueryPlace)
  const [postsQuery,setPostQuery] = useState<any>()
  const postsAll = queryClient.getQueryData<any>('posts')

  useEffect(() => {
    // あとでリファクタリングする
    if(queryGenre && queryPlace){ 
      // 絞り込むジャンルをセットし、フィルターをかける
      const filterGenrePosts = filterGenre(postsAll.posts)
      const filterGenrePlacePosts = filterPlace(filterGenrePosts)
      setPostQuery(filterGenrePlacePosts)
    }else if(queryPlace && !queryGenre){
      const filterPlacePosts = filterPlace(postsAll.posts)
      setPostQuery(filterPlacePosts)      
    } else if(queryGenre && !queryPlace){
      const filterGenrePosts = filterGenre(postsAll.posts)
      setPostQuery(filterGenrePosts)
    }
  }, [queryGenre,queryPlace])

  const filterGenre = (posts:any) => {
    const filterGenre = posts.filter((v:any) => v.genre.filter((v:any) => v === queryGenre) === queryGenre)
    return filterGenre
  }
  const filterPlace = (posts:any) => {
    const filterPlace = posts.filter((post:any) => post.place.indexOf(queryPlace) >= 0 === true)
    return filterPlace
  }
  return (
    <div className='py-12'>
      <h2 className='text-center text-xl font-bold mb-4'>新着投稿一覧</h2>
      <div className="flex flex-wrap justify-center">
      {queryGenre || queryPlace ? 
      postsQuery?.map((item:any) => (
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

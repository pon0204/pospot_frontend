import { useEffect, useState, VFC } from 'react';
import { useQueryClient } from 'react-query';
import { useAppSelector } from '../../../app/hooks';
import { selectQueryGenre, selectQueryPlace } from '../../../slices/postSlice';
import { Post, Posts } from '../../../types/types';
import { PostCard } from '../PostCards/PostCard';

const PostsAll:VFC = () => {
  const queryClient = useQueryClient()
  const queryGenre = useAppSelector(selectQueryGenre)
  const queryPlace = useAppSelector(selectQueryPlace)
  const [postsQuery,setPostQuery] = useState<Post[]>()
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
      console.log(postsAll)
      const filterGenrePosts = filterGenre(postsAll.posts)
      console.log(filterGenrePosts)
      console.log(queryGenre)
      setPostQuery(filterGenrePosts)
    }
  }, [queryGenre,queryPlace])

  const filterGenre = (posts:Post[]) => {
    const filterGenre = posts.filter((post:any) => post.genre.filter((genre:string) => genre == queryGenre) == queryGenre)
    return filterGenre
  }
  
  const filterPlace = (posts:Post[]) => {
    const filterPlace = posts.filter((post:Post) => post.place.indexOf(queryPlace) >= 0 === true)
    return filterPlace
  }
  return (
    <div className='py-12'>
      <h2 className='text-center text-xl font-bold mb-4'>新着投稿一覧</h2>
      <div className="flex flex-wrap justify-center">
      {queryGenre || queryPlace ? 
      postsQuery?.map((item:Post) => (
          <PostCard item={item}/>
      ))
      :
      postsAll?.posts.map((item:Post) => (
          <PostCard item={item}/>
        ))
      } 
      </div>
    </div>
  )
}

export default PostsAll

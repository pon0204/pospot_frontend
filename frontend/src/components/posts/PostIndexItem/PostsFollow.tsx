import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useAppSelector } from '../../../app/hooks';
import { selectQueryGenre, selectQueryPlace } from '../../../slices/postSlice';
import { FollowingsId, Post } from '../../../types/types';
import { PostCard } from '../PostCards/PostCard';

const PostsFollow = () => {
  const queryClient = useQueryClient()
  const queryGenre = useAppSelector(selectQueryGenre)
  const queryPlace = useAppSelector(selectQueryPlace)
  const [postsQuery,setPostQuery] = useState<Post[]>()
  const postsAll = queryClient.getQueryData<any>('posts')
  const follows = queryClient.getQueryData<any>('follows')
  
  const postsQueryFollow = postsAll.posts.filter((post:Post) => follows?.followings.map((following:FollowingsId) => following.id) == post.user_id )
  
  useEffect(() => {
    // あとでリファクタリングする
    if(queryGenre && queryPlace){       
      // 絞り込むジャンルをセットし、フィルターをかける
      const filterGenrePosts = filterGenre(postsQueryFollow)
      const filterGenrePlacePosts = filterPlace(filterGenrePosts)
      setPostQuery(filterGenrePlacePosts)      
    }else if(queryPlace && !queryGenre){
      const filterPlacePosts = filterPlace(postsQueryFollow)
      setPostQuery(filterPlacePosts)      
    } else if(queryGenre && !queryPlace){
      const filterGenrePosts = filterGenre(postsQueryFollow)
      setPostQuery(filterGenrePosts)
    }
  }, [queryGenre,queryPlace])

  const filterGenre = (posts:Post[]) => {
    const filterGenre = posts.filter((post:any) => post.genre.filter((genre:string) => genre == queryGenre) == queryGenre)
    return filterGenre
  }
  const filterPlace = (posts:Post[]) => {
    const filterPlace = posts.filter((post:Post) => post.place.indexOf(queryPlace) >= 0 == true)
    return filterPlace
  }

  return (
  <div className='py-12'>
    <h2 className='text-center text-xl font-bold mb-4'>フォロー投稿一覧</h2>
    <div className="flex flex-wrap justify-center">
      {queryGenre || queryPlace? 
      postsQuery?.map((item:Post) => (
          <PostCard item={item}/>
      ))
      :
      postsQueryFollow?.map((item:Post) => (
          <PostCard item={item}/>
        ))
      } 
      </div>
  </div>
  )
}

export default PostsFollow

import { CircularProgress } from '@material-ui/core';
import { useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import useIntersectionObserver from '../../../../hooks/castomHook/useIntersectionObserver';
import { useQueryInfinitePostsNew } from '../../../../hooks/reactQuery/useQueryInfinitePostsNew';
import { resetQueryPage, selectQueryGenre } from '../../../../slices/postSlice';
import { PostCardMemo } from '../../PostCards/PostCard';

const PostsItemNewGenre = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const queryGenre = useAppSelector(selectQueryGenre)

  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useQueryInfinitePostsNew(queryGenre,null)

  const loadMoreButtonRef = useRef<any>() 

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  useEffect(() => {
    
    return () => {
      dispatch(resetQueryPage())
      queryClient.removeQueries('postsInfiniteNew',{exact: true})
    }
  }, [queryGenre])

  return (
    <div>
      <div className='md:flex md:flex-wrap justify-center pb-12'>
        {data?.pages.map(page => (
            <div className='md:flex'>
              {
                page.posts.map((post:any) => (
                  <PostCardMemo item={post}/>
                ))}
            </div>
          ))}
      </div>
      <div className='mx-auto w-96 text-center relative'>
        <button 
        ref={loadMoreButtonRef}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => {
          fetchNextPage();
        }}>
        {isFetchingNextPage || status === 'loading'
          ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><CircularProgress/></div>
          : hasNextPage
          ? '投稿をさらに読み込みますか?'
          : '投稿は以上です。'}
        </button> 
      </div>
    </div>
  )
}
export default PostsItemNewGenre
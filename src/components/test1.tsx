import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { useRef } from 'react'
import { useState } from 'react'
import { useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import useIntersectionObserver from '../hooks/castomHook/useIntersectionObserver'
import { useQueryInfinitePosts } from '../hooks/reactQuery/useQueryInfinitePosts'
import { incrementQueryPage, selectPage } from '../slices/postSlice'
import { PostCardMemo } from './posts/PostCards/PostCard'

const Test1 = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(selectPage)
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useQueryInfinitePosts()

  const loadMoreButtonRef = useRef<any>() 

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  if (status === 'loading') return (<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><CircularProgress/></div>)
  if (status === 'error') return (<div>{'Error'}</div>)

  return (
    <div>
      <div className='md:flex md:flex-wrap'>
      {data?.pages.map(page => (
          <div className='md:flex'>
            {
              page.posts.map((post:any) => (
                <PostCardMemo item={post}/>
              ))}
          </div>
        ))}
      </div>
      <div>

      <button 
      ref={loadMoreButtonRef}
      disabled={!hasNextPage || isFetchingNextPage}
      onClick={() => {
        fetchNextPage();
      }}>
      {isFetchingNextPage
        ? '読込中です'
        : hasNextPage
        ? '投稿をさらに読み込みますか?'
        : '投稿が見つかりません'}
    </button>
    </div>
    </div>
  ) 
}

export default Test1
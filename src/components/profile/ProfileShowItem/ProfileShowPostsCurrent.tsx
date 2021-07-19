import { useEffect, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useAppDispatch } from '../../../app/hooks'
import useIntersectionObserver from '../../../hooks/castomHook/useIntersectionObserver'
import { useQueryInfinitePostsCurrent } from '../../../hooks/reactQuery/useQueryInfinitePostsCurrent'
import { resetQueryPage } from '../../../slices/postSlice'
import { PostCardMemo } from '../../posts/PostCards/PostCard'

const ProfileShowPostsCurrent = (id:any) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useQueryInfinitePostsCurrent(id.id)

  const loadMoreButtonRef = useRef<any>() 

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  useEffect(() => {
    return () => {
      dispatch(resetQueryPage())
      queryClient.removeQueries('postsInfiniteCurrent',{exact:true})
    }
  }, [])

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
      <div className='mx-auto w-96 text-center'>
        <button 
        ref={loadMoreButtonRef}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => {
          fetchNextPage();
        }}>
        {isFetchingNextPage || status === 'loading'
          ? '読込中です'
          : hasNextPage
          ? '投稿をさらに読み込みますか?'
          : '投稿は以上です。'}
        </button> 
      </div>
    </div>
  )
}

export default ProfileShowPostsCurrent

import { CircularProgress } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useAppDispatch } from '../../../app/hooks'
import useIntersectionObserver from '../../../hooks/castomHook/useIntersectionObserver'
import { useQueryInfinitePostsCurrent } from '../../../hooks/reactQuery/useQueryInfinitePostsCurrent'
import { resetQueryPage } from '../../../slices/postSlice'
import { Post } from '../../../types/types'
import { PostCardMemo } from '../../posts/PostCards/PostCard'

const ProfileShowPostsCurrent = (id: any) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useQueryInfinitePostsCurrent(id.id)

  const loadMoreButtonRef = useRef<any>()

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  useEffect(() => {
    return () => {
      dispatch(resetQueryPage())
      queryClient.resetQueries('postsInfiniteCurrent', { exact: true })
    }
  }, [])

  return (
    <div>
      <div className="pb-12">
        {data?.pages.map((page, index) => (
          <div className="md:flex md:flex-wrap justify-center" key={index}>
            {page.posts.map((post: Post) => (
              <PostCardMemo item={post} key={post.id} />
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto w-80 text-center relative">
        <button
          ref={loadMoreButtonRef}
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => {
            fetchNextPage()
          }}
        >
          {isFetchingNextPage || status === 'loading' ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CircularProgress />
            </div>
          ) : hasNextPage ? (
            '投稿をさらに読み込みますか?'
          ) : (
            '投稿は以上です。'
          )}
        </button>
      </div>
    </div>
  )
}

export default ProfileShowPostsCurrent

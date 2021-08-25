import { CircularProgress } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useAppDispatch } from '../../../app/hooks'
import useIntersectionObserver from '../../../hooks/castomHook/useIntersectionObserver'
import { useQueryInfinitePostsLike } from '../../../hooks/reactQuery/useQueryInfinitePostsLike'
import { resetQueryPage } from '../../../slices/postSlice'
import { Post } from '../../../types/types'
import { PostCardMemo } from '../../posts/PostCards/PostCard'

interface Props {
  id: string
}

const ProfileShowPostsLike = (id: Props) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useQueryInfinitePostsLike(id.id)

  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null)

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  useEffect(() => {
    return () => {
      dispatch(resetQueryPage())
      queryClient.resetQueries('postsInfiniteLike', { exact: true })
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
      <div className="w-80 relative mx-auto text-center">
        <button
          ref={loadMoreButtonRef}
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => {
            fetchNextPage()
          }}
        >
          {isFetchingNextPage || status === 'loading' ? (
            <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
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

export default ProfileShowPostsLike

import { CircularProgress } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import useIntersectionObserver from '../../../hooks/castomHook/useIntersectionObserver'
import { useQueryInfinitePostsFollow } from '../../../hooks/reactQuery/useQueryInfinitePostsFollow'
import {
  resetQueryPage,
  selectQueryGenre,
  selectQueryPlace,
} from '../../../slices/postSlice'
import { Post } from '../../../types/types'
import { PostCardMemo } from '../PostCards/PostCard'

const PostsFollow = () => {
  const currentUserId = localStorage.getItem('currentUserId')
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const queryGenre = useAppSelector(selectQueryGenre)
  const queryPlace = useAppSelector(selectQueryPlace)

  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useQueryInfinitePostsFollow(currentUserId, queryGenre, queryPlace)

  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null)

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  useEffect(() => {
    return () => {
      dispatch(resetQueryPage())
      queryClient.removeQueries('postsInfiniteFollow', { exact: true })
    }
  }, [queryGenre, queryPlace])

  if (!currentUserId) {
    return <h2 className="text-center">ログインしてください</h2>
  }

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
export default PostsFollow

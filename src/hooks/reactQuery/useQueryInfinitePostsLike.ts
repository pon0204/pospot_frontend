import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { incrementQueryPage, selectPage } from '../../slices/postSlice'
import { Posts } from '../../types/types'

export const useQueryInfinitePostsLike = (userId: string) => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(selectPage)
  const getInfinitePostsLike = async ({ pageParam = 0 }) => {
    const { data } = await axios.get<Posts>(
      `${process.env.REACT_APP_REST_URL}/posts/like/${userId}/page/` + pageParam
    )
    //Post型定義をすると、splitが存在しないとなるため、any記述
    data.posts.map((v: any) => (v.genre = v.genre.split(',')))
    dispatch(incrementQueryPage())
    return data
  }

  return useInfiniteQuery('postsInfiniteLike', getInfinitePostsLike, {
    getNextPageParam: (lastPage) =>
      lastPage.posts.length !== 0 ? page : false,
  })
}

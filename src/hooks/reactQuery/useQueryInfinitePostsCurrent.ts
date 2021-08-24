import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { incrementQueryPage, selectPage } from '../../slices/postSlice'

export const useQueryInfinitePostsCurrent = (userId: string) => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(selectPage)
  const getInfinitePostsCurrent = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/posts/user/${userId}/page/` + pageParam
    )
    // ジャンルを配列に変換
    data.posts.map((v: any) => (v.genre = v.genre.split(',')))
    dispatch(incrementQueryPage())
    return data
  }

  return useInfiniteQuery('postsInfiniteCurrent', getInfinitePostsCurrent, {
    getNextPageParam: (lastPage) =>
      lastPage.posts.length !== 0 ? page : false,
  })
}

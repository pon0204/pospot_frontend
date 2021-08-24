import axios from 'axios'
import { useQuery } from 'react-query'
import { Posts } from '../../types/types'

export const useQueryPosts = () => {
  const getPosts = async () => {
    const { data } = await axios.get<Posts>(`${process.env.REACT_APP_REST_URL}/posts`)
    //Post型定義をすると、splitが存在しないとなるため、any記述
    data.posts.map((v: any) => (v.genre = v.genre.split(',')))
    return data
  }

  return useQuery({
    queryKey: 'posts',
    queryFn: getPosts,
    staleTime: 10000,
  })
}

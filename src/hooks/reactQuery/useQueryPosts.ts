import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryPosts = () => {
  const getPosts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/posts`)
      // ジャンルを配列に変換
      data.posts.map((v:any) => v.genre = v.genre.split(','))
      return data
  }

  return useQuery({
    queryKey: 'posts',
    queryFn: getPosts,
    staleTime: 10000,
  })
}
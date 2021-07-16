import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryPostShow = (id:number) => {

  const getPostShow = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/posts/${id}`)
      return data
  }

  return useQuery({
    queryKey: 'postShow',
    queryFn: getPostShow,
    staleTime: 0,
    cacheTime: 0,
  })
}





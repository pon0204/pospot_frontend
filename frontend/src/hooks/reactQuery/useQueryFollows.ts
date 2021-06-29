import { useQuery } from 'react-query'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectHeaders } from "../../slices/headersSlice";
import { setFollowsCount } from '../../slices/followSlice';

export const useQueryFollows = (profileId:number | string) => {
  // const token = useAppSelector(selectUserToken)
  const headers = useAppSelector(selectHeaders)
  const dispatch = useAppDispatch()
  
  const getFollows = async () => {
    const { data } = await axios.get(
    `${process.env.REACT_APP_REST_URL}/profiles/${profileId}/follows`,headers)
      dispatch(setFollowsCount(data))
      return data
  }

  return useQuery({
    queryKey: 'follows',
    queryFn: getFollows,
    staleTime: 0,
    cacheTime: 0,
    // refetchOnWindowFocus: true,
    //cacheTime: 5000,
    // refetchInterval: 5000,
  })
}
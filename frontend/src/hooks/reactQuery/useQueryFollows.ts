import axios from 'axios';
import { useQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFollowsCount } from '../../slices/followSlice';
import { selectHeaders } from "../../slices/headersSlice";

export const useQueryFollows = (profileId:number | string | null) => {
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
  })
}
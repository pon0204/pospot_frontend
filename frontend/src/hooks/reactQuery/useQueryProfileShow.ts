import axios from 'axios';
import { useQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectHeaders } from "../../slices/headersSlice";
import { setEditedProfile } from "../../slices/profileSlice";

export const useQueryProfileShow = (id:number) => {

  const headers = useAppSelector(selectHeaders)
  const dispatch = useAppDispatch()

  const getProfileShow = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/profiles/${id}`,headers)
      dispatch(setEditedProfile(data.profile))
      return data
  }

  return useQuery({
    queryKey: 'profileShow',
    queryFn: getProfileShow,
    staleTime: 0,
    cacheTime: 0,
  })
}



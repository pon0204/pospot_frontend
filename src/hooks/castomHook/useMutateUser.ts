import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetApiLoading } from '../../slices/apiSlice';
import { selectHeaders } from "../../slices/headersSlice";
import { setCurrentAvatar } from '../../slices/profileSlice';
import { EditProfile } from '../../types/types';

export const useMutateUser = () => {
  const headers = useAppSelector(selectHeaders)
  const history = useHistory()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const userIdMutation = useMutation(

    () => 
    axios.get(`${process.env.REACT_APP_REST_URL}/user_id`,headers),
  {
    onSuccess: (res) => {
      localStorage.setItem('currentUserId', res.data)
    }
  })

  const profileUpdateMutation = useMutation(
    (data:EditProfile) =>
    axios.put(`${process.env.REACT_APP_REST_URL}/profiles/1`,data,headers),
      {
      onSuccess: (res) => {
        dispatch(resetApiLoading())
        dispatch(setCurrentAvatar(res.data.avatar_url))
        history.push(`/profile/${res.data.id}`)
        }
      }
    )


    return { userIdMutation,profileUpdateMutation}
}



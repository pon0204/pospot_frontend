import axios from 'axios'
import {useAppDispatch, useAppSelector } from '../../app/hooks'
import { useMutation, useQueryClient } from 'react-query'
import { selectHeaders } from "../../slices/headersSlice";
import { EditProfile } from '../../types/types';
import { useHistory } from 'react-router-dom';
import { setCurrentAvatar } from '../../slices/profileSlice';
import { resetApiLoading } from '../../slices/apiSlice';

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



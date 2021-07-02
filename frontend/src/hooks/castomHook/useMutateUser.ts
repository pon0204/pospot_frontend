import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../../app/hooks'
import { useMutation } from 'react-query'
import { selectHeaders } from "../../slices/headersSlice";
import { setShowProfile } from '../../slices/profileSlice'

export const useMutateUser = () => {
  const dispatch = useAppDispatch()
  const headers = useAppSelector(selectHeaders)
  
  const userIdMutation = useMutation(
    () => 
    axios.get(`${process.env.REACT_APP_REST_URL}/user_id`,headers),
  {
    onSuccess: (res) => {
      localStorage.setItem('currentUserId', res.data)
    }
  })

  const profileShowMutation = useMutation(
    (id:number) => 
    axios.get(`${process.env.REACT_APP_REST_URL}/profiles/${id}`),
  {
    onSuccess: (res) =>{
      dispatch(setShowProfile(res.data))
    }
  }
  )
  const profileUpdateMutation = useMutation(
    (data:any) =>
    axios.put(`${process.env.REACT_APP_REST_URL}/profiles/1`,data,headers),
    )

    return { userIdMutation,profileUpdateMutation,profileShowMutation}
}



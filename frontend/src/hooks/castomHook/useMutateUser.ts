import { EditPost, PostData } from '../../types/types'
import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../../app/hooks'
// import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from 'react-query'
import { selectSpot } from '../../slices/spotSlice'
import { setEditedPost,resetEditedPost, setShowPost } from '../../slices/postSlice'

import { useMutateSpot } from './useMutateSpot'

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
    axios.put(`${process.env.REACT_APP_REST_URL}/profiles/2`,data,headers),
    {
      onSuccess: (res) => {
        console.log(res)
      }      
    }
    
    
    )

    return { userIdMutation,profileUpdateMutation,profileShowMutation}
}



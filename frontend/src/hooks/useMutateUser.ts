import { EditPost, PostData } from '../types/types'
import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../app/hooks'
// import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from 'react-query'
import { selectSpot } from '../slices/spotSlice'
import { setEditedPost,resetEditedPost, setShowPost, setQueryPost } from '../slices/postSlice'

import { useMutateSpot } from './useMutateSpot'

import { selectHeaders } from "../slices/headersSlice";


export const useMutateUser = () => {
  const dispatch = useAppDispatch()
  const headers = useAppSelector(selectHeaders)
  
  const userIdMutation = useMutation(
    () => 
    axios.get(`${process.env.REACT_APP_REST_URL}/user_id`,headers),
  {
    onSuccess: (res) => {
      console.log(res.data)
      localStorage.setItem('currentUserId', res.data)
    }
  })
  return { userIdMutation}
}





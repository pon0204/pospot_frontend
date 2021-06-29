import axios from 'axios'
import {useAppSelector, useAppDispatch } from '../../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { selectHeaders } from "../../slices/headersSlice";
import { filter } from 'lodash';
import { setFollowsCount } from '../../slices/followSlice';

export const useMutateFollow = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const headers = useAppSelector(selectHeaders)
  const currentUserId = localStorage.getItem('currentUserId')

  const createFollowMutation = useMutation(
    (profileId:number) => 
      axios.post(`${process.env.REACT_APP_REST_URL}/profiles/${profileId}/follows`,null,headers),
    {
      onSuccess: (res,variables) => {
        const previousFollows = queryClient.getQueryData<any>('follows')
        const newFollowerId = {id: res.data.follower_id}
        previousFollows.followers = [...previousFollows.followers,newFollowerId]
        queryClient.setQueryData<any>('follows',previousFollows)
        dispatch(setFollowsCount(previousFollows))
      },
    }
  )

  const deleteFollowMutation = useMutation(
    (profileId: number) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/profiles/${profileId}/follows/1`,headers),
    {
      onSuccess: (res) => {
        const previousFollows = queryClient.getQueryData<any>('follows')
        const deleteFollowerId = res.data.follower_id
        const newFollows = previousFollows.followers.filter((v:any) => v.id != deleteFollowerId)
        previousFollows.followers = newFollows
        queryClient.setQueryData<any>('follows',previousFollows)
        dispatch(setFollowsCount(previousFollows))
      }
    }
  )
  return { createFollowMutation ,deleteFollowMutation}
}





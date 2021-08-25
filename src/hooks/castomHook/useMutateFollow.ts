import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetApiLoading } from '../../slices/apiSlice'
import { setFollowsCount } from '../../slices/followSlice'
import { selectHeaders } from '../../slices/headersSlice'
import { FollowData } from '../../types/types'

export const useMutateFollow = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const headers = useAppSelector(selectHeaders)

  const createFollowMutation = useMutation(
    (profileId: string) =>
      axios.post(
        `${process.env.REACT_APP_REST_URL}/profiles/${profileId}/follows`,
        null,
        headers
      ),
    {
      onSuccess: (res, variables) => {
        // FollowDataで型定義時に、50行目にエラーが発生する為、暫定でany
        const previousFollows = queryClient.getQueryData<any>('follows')
        const newFollowerId = { id: res.data.follower_id }
        previousFollows.followers = [
          ...previousFollows.followers,
          newFollowerId,
        ]
        queryClient.setQueryData<FollowData>('follows', previousFollows)
        dispatch(setFollowsCount(previousFollows))
        dispatch(resetApiLoading())
      },
    }
  )

  const deleteFollowMutation = useMutation(
    (profileId: string) =>
      axios.delete(
        `${process.env.REACT_APP_REST_URL}/profiles/${profileId}/follows/1`,
        headers
      ),
    {
      onSuccess: (res) => {
        // FollowDataで型定義時に、50行目にエラーが発生する為、暫定でany
        const previousFollows = queryClient.getQueryData<any>('follows')
        const deleteFollowerId = res.data.follower_id
        const newFollows = previousFollows.followers.filter(
          (v: {id:number}) => v.id !== deleteFollowerId
        )
        previousFollows.followers = newFollows
        queryClient.setQueryData<FollowData>('follows', previousFollows)
        dispatch(setFollowsCount(previousFollows))
        dispatch(resetApiLoading())
      },
    }
  )
  return { createFollowMutation, deleteFollowMutation }
}

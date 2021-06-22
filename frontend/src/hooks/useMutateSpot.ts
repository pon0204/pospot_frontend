import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { setEditedSpot } from '../slices/spotSlice'
import { useQueryClient, useMutation } from 'react-query'

import { useAppSelector } from "../app/hooks";
import { selectUserToken } from "../slices/userToken";


export const useMutateSpot = () => {
  const queryClient = useQueryClient()
  const token = useAppSelector(selectUserToken)
  const dispatch = useAppDispatch()

    let headers = 
    {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": 'application/json',
    }
    }

  const fetchSpotMutation = useMutation(
    (placeId) =>
    axios.get(`${process.env.REACT_APP_REST_URL}/spot/${placeId}`),
    {
      onSuccess: (res) => {
        console.log(res.data)
        dispatch(setEditedSpot(res.data))
      },
    }
  )


  const createSpotMutation = useMutation(
    (spot) => 
      axios.post(`${process.env.REACT_APP_REST_URL}/spots/`, spot,headers),
    {
      onSuccess: (res) => {
        console.log(res)
        // const previousSpots = queryClient.getQueryData<any>('spots')
        // if (previousSpots) {
        //   queryClient.setQueryData('spots', [
        //     ...previousSpots,
        //     res.data,
        //   ])
        // }
        // dispatch(resetEditedTask())
      },
    }
  )

  const deleteSpotMutation = useMutation(
    (id: any) => 
    axios.delete(`${process.env.REACT_APP_REST_URL}/spots/${id}`,headers),
    {
      onSuccess: (res,variables) => {
        const previousSpots = queryClient.getQueryData<any>('spots')
        if (previousSpots) {
          queryClient.setQueryData(
            'spots',
            previousSpots.filter((spot:any) => spot.id !== variables)    
          )
        }
      }
    }
  )
  return { createSpotMutation ,deleteSpotMutation,fetchSpotMutation }
}





import axios from 'axios'
import { useAppDispatch } from '../../app/hooks'
import { setEditedSpot,resetEditedSpot } from '../../slices/spotSlice'
import { useMutation } from 'react-query'
import { useAppSelector } from "../../app/hooks";
import { selectHeaders } from "../../slices/headersSlice";
import { EditSpot,SpotData } from '../../types/types';

export const useMutateSpot = () => {
  const headers = useAppSelector(selectHeaders)
  const dispatch = useAppDispatch()

  const fetchSpotMutation = useMutation(
    (placeId) =>
    axios.get(`${process.env.REACT_APP_REST_URL}/spot/${placeId}`,headers),
    {
      onSuccess: (res) => {
        dispatch(setEditedSpot(res.data))
      },
    }
  )

  const createSpotMutation = useMutation(
    (spot:EditSpot) => 
      axios.post<SpotData>(`${process.env.REACT_APP_REST_URL}/spots/`, spot,headers),
    {
      onSuccess: (res) => {
        dispatch(resetEditedSpot())
      },
    }
  )

  return { createSpotMutation,fetchSpotMutation }
}





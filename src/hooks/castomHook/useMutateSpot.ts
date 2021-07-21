import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetApiLoading, resetApiLoadingOther } from '../../slices/apiSlice';
import { selectHeaders } from "../../slices/headersSlice";
import { resetEditedPost } from '../../slices/postSlice';
import { resetEditedSpot, setEditedSpot } from '../../slices/spotSlice';
import { EditSpot, SpotData } from '../../types/types';

export const useMutateSpot = () => {
  const headers = useAppSelector(selectHeaders)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const fetchSpotMutation = useMutation(
    (placeId) =>
    axios.get(`${process.env.REACT_APP_REST_URL}/spot/${placeId}`,headers),
    {
      onSuccess: (res) => {
        dispatch(resetApiLoadingOther())
        dispatch(setEditedSpot(res.data))
      },
    }
  )

  const createSpotMutation = useMutation(
    (spot:EditSpot) => 
      axios.post<SpotData>(`${process.env.REACT_APP_REST_URL}/spots/`, spot,headers),
    {
      onSuccess: (res) => {
        dispatch(resetApiLoading())
        dispatch(resetEditedSpot())
        dispatch(resetEditedPost())
        history.push('/posts')
      },
    }
  )

  return { createSpotMutation,fetchSpotMutation }
}





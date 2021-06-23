import React from 'react'
import { createNamedExports } from 'typescript'
import { useAppDispatch , useAppSelector} from '../../../app/hooks'
import { setEditedSpot, selectSpot } from '../../../slices/spotSlice'

const FormSpots = () => {
  const editedSpot = useAppSelector(selectSpot)
  const map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${editedSpot.spot.name} ${editedSpot.spot.place}`
  return (
    <div>
      <p>{editedSpot.spot.name}</p>
      <p>{editedSpot.spot.place}</p>
      <p>{editedSpot.spot.map_url}</p>
      <p>{editedSpot.spot.web_url}</p>
      
      {editedSpot.spot.place &&
        <iframe src={map_url}  scrolling="no" width="100%" height="600"></iframe>
        }
    </div>
  )
}

export default FormSpots

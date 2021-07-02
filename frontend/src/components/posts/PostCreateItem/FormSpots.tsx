import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectSpot } from '../../../slices/spotSlice'

const FormSpots = () => {
  const editedSpot = useAppSelector(selectSpot)

  const map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${editedSpot.spot.name} ${editedSpot.spot.place}`
  return (
    <div>      
      <div className='my-4 bg-green-50 rounded-md p-4'>
      <h3 className="text-xl font-bold">マップ情報</h3>
      <p className='mt-4 text-lg'>【スポット名】<br/>{editedSpot.spot.name}</p>
      <p className='mt-4 text-lg'>【場所】<br/>{editedSpot.spot.place_detail}</p>
      <p className='mt-4 text-lg'>【ウェブサイト】<br/>
      {editedSpot.spot.web_url ? 
      <a className='text-blue-700' href={editedSpot.spot.web_url}>{editedSpot.spot.name}</a>
      :
      <a className='text-blue-700' href={editedSpot.spot.web_url}>ウェブサイトが見つかりませんでした。</a>
      }
      </p>
      </div>
      {editedSpot.spot.place &&
        <iframe src={map_url}  scrolling="no" width="100%" height="600"></iframe>
        }
    </div>
  )
}

export default FormSpots

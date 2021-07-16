import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectSpot } from '../../../slices/spotSlice'

const FormSpots = () => {
  const editedSpot = useAppSelector(selectSpot)

  const map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${editedSpot.spot.name} ${editedSpot.spot.place}`
  return (
    <div> 
      
      <div className='my-3 px-2'>
        <h3 className="text-2xl font-bold bg-gray-100 p-2 border-blue-400 border-b">マップ情報</h3>
        <div className='pl-2'>
        <h4 className='border-b font-bold text-xl mt-4 pb-1'>スポット名</h4>
        <p className='text-lg pt-2'>{editedSpot.spot.name}</p>
        <h4 className='border-b font-bold text-xl mt-2 pb-1'>場所</h4>
        <p className='text-lg pt-2'>{editedSpot.spot.place_detail}</p>
        <h4 className='border-b font-bold text-xl mt-2 pb-1'>ウェブサイト</h4>
        {editedSpot.spot.web_url ? 
          <a className='text-blue-700 pt-2 block text-lg' href={editedSpot.spot.web_url}>{editedSpot.spot.name}</a>
          :
          <p>ウェブサイトが見つかりませんでした。</p>
        }
        </div>
      </div>
      {editedSpot.spot.place &&
        <iframe src={map_url}  scrolling="no" width="100%" height="600"></iframe>
        }
    </div>
  )
}

export default FormSpots


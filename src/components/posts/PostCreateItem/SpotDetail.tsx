import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectLoadingOther } from '../../../slices/apiSlice'
import { selectSpot } from '../../../slices/spotSlice'

const SpotDetail = () => {
  const editedSpot = useAppSelector(selectSpot)
  const loadingOther = useAppSelector(selectLoadingOther)

  const map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${editedSpot.spot.name} ${editedSpot.spot.place}`
  return (
    <div>
      <div className="px-2 my-3">
        <h3 className="p-2 text-2xl font-bold bg-gray-100 border-b border-blue-400">
          マップ情報
        </h3>
        <div className="pl-2">
          <h4 className="pb-1 mt-4 text-xl font-bold border-b">スポット名</h4>
          {loadingOther ? (
            <div className="pt-2">
              <Skeleton variant="rect" width={200} height={20} />
            </div>
          ) : (
            <p className="pt-2 text-lg">{editedSpot.spot.name}</p>
          )}
          <h4 className="pb-1 mt-2 text-xl font-bold border-b">場所</h4>
          {loadingOther ? (
            <div className="pt-2">
              <Skeleton variant="rect" width={200} height={20} />
            </div>
          ) : (
            <p className="pt-2 text-lg">{editedSpot.spot.place_detail}</p>
          )}
          <h4 className="pb-1 mt-2 text-xl font-bold border-b">ウェブサイト</h4>
          {loadingOther ? (
            <div className="pt-2">
              <Skeleton variant="rect" width={200} height={20} />
            </div>
          ) : editedSpot.spot.web_url ? (
            <a
              className="block pt-2 text-lg text-blue-700"
              href={editedSpot.spot.web_url}
            >
              {editedSpot.spot.name}
            </a>
          ) : (
            <p>ウェブサイトが見つかりませんでした。</p>
          )}
        </div>
      </div>
      {loadingOther ? (
        <Skeleton variant="rect" width={'100%'} height={600} />
      ) : (
        editedSpot.spot.place && (
          <iframe
            src={map_url}
            scrolling="no"
            width="100%"
            height="600"
          ></iframe>
        )
      )}
    </div>
  )
}

export default SpotDetail

import CircularProgress from '@material-ui/core/CircularProgress'
import React, { VFC } from 'react'
import { useQueryPostShow } from '../../hooks/reactQuery/useQueryPostShow'

interface Props {
  id: number
}

const PostShow: VFC<Props> = (id) => {
  const { status, data } = useQueryPostShow(id.id)
  const post = data?.post
  const spot = data?.spot
  const image_url = data?.image_url

  let map_url = ''

  if (status == 'success') {
    map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${spot.name} ${spot.place}`
  }

  let genres = post?.genre

  if (genres) {
    genres = genres.split(',')
    genres = genres.slice(0, 5)
  } else {
    genres = null
  }

  // if (status === 'loading') return (<div className='absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2'><CircularProgress/></div>)
  if (status === 'loading')
    return (
      <div className="bottom-1/2 left-44 md:bottom-1/2 md:left-1/2 absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2">
        <CircularProgress />
      </div>
    )

  if (status === 'error') return <div>{'Error'}</div>

  return (
    <div className="lg:w-11/12 lg:mx-auto w-full">
      <h2 className="mt-10 text-4xl font-bold text-center text-gray-700">
        {post.title}
      </h2>
      <hr className="w-16 mx-auto mt-2 border-blue-600" />
      <p className="mt-4 text-lg text-center text-gray-600">
        {post.created_at.substring(0, post.created_at.indexOf('T'))}
      </p>
      <div className="flex my-4 overflow-x-auto">
        <div className="whitespace-nowrap p-2 mx-2 text-center bg-red-200 rounded-md">
          {post.with}
        </div>
        {genres?.map((genre: string, index: number) => (
          <div
            className="whitespace-nowrap p-2 mx-2 bg-green-200 rounded-md"
            key={index}
          >
            {genre}
          </div>
        ))}
      </div>
      <h3 className="whitespace-nowrap md:text-2xl md:p-2 p-1 mx-2 my-2 overflow-x-auto text-lg text-center text-blue-600 border border-blue-600 rounded-md">
        {spot.name}
      </h3>
      <img
        src={image_url}
        className="block object-cover w-full mx-auto"
        alt=""
      />
      <div className="px-2 mt-3">
        <h3 className="p-2 text-2xl font-bold bg-gray-100 border-b border-blue-400">
          説明
        </h3>
        <p className="pl-2 mt-4 text-lg">{post.caption}</p>
      </div>

      <div className="px-2 mt-3">
        <h3 className="p-2 text-2xl font-bold bg-gray-100 border-b border-blue-400">
          マップ情報
        </h3>
        <div className="pl-2">
          <h4 className="pb-1 mt-4 text-xl font-bold border-b">スポット名</h4>
          <p className="pt-2 text-lg">{spot.name}</p>
          <h4 className="pb-1 mt-2 text-xl font-bold border-b">場所</h4>
          <p className="pt-2 text-lg">{spot.place_detail}</p>
          <h4 className="pb-1 mt-2 text-xl font-bold border-b">ウェブサイト</h4>
          {spot.web_url ? (
            <a className="block pt-2 text-lg text-blue-700" href={spot.web_url}>
              {spot.name}
            </a>
          ) : (
            <p>ウェブサイトが見つかりませんでした。</p>
          )}
        </div>
      </div>
      <iframe
        className="mt-4"
        src={map_url}
        scrolling="no"
        width="100%"
        height="600"
      ></iframe>
    </div>
  )
}
export default PostShow

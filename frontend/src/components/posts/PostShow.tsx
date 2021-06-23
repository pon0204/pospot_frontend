import React, { VFC } from 'react'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useMutatePost } from '../../hooks/useMutatePost'
import { useQueryPostShow } from '../../hooks/useQueryPostShow'

import { useAppSelector } from '../../app/hooks'
import { selectShowPost } from '../../slices/postSlice'
import { PostData } from '../../types/types'


const PostShow: VFC<any> = ({match}) => {
  const id = match.params.postId

  const { status, data } = useQueryPostShow(id)

  const post = data?.post
  const spot = data?.spot
  
  let map_url = ''
  if(status == 'success'){
  map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${spot.name} ${spot.place}`
  }
  
  const image_url = data?.image_url  

  let genres = post?.genre  

  if(genres){
    genres = genres.split(',')
    genres = genres.slice(0,3)
  }else {
    genres = null
  }

  if (status === 'loading') return (<div>{'loading'}</div>  )
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <div className='w-1/2 mx-auto'>
      <h2 className='mt-3 text-4xl text-gray-700 font-bold text-center'>{post.title}</h2>
      <div className="bg-red-200  rounded-md p-1 inline-block text-sm text-center m-4 mb-0">
        {post.with}
      </div>
      <div className="flex mt-4">
      {genres?.map((genre:string) => (
        <div className="bg-green-200 mx-4 rounded-md p-1 text-sm">
          {genre}
        </div>
      ))}
      </div>
      <img src={image_url} className='block mx-auto object-cover w-full' alt="" />

      <div className='bg-gray-100 p-4 mt-3 rounded-md'>
      <h3 className="text-xl font-bold">説明</h3>
      <p className="text-lg mt-4">{post.caption}</p>
      </div>
      
      <div className='mt-4 bg-green-100 rounded-md p-4'>
      <h3 className="text-xl font-bold">マップ情報</h3>
      <p className='mt-4 text-lg'>スポット名:<span>{spot.name}</span></p>
      <p className='mt-4 text-lg'>場所:<span>{spot.place}</span></p>
      <p className='mt-4 text-lg'>ウェブサイト:<a className='text-blue-700' href={spot.web_url}>{spot.web_url}</a></p>
      </div>
      <iframe className='mt-4' src={map_url}  scrolling="no" width="100%" height="600"></iframe>

    </div>
  )
}

export default PostShow

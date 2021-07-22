import CircularProgress from '@material-ui/core/CircularProgress'
import React, { VFC } from 'react'
import { useQueryPostShow } from '../../hooks/reactQuery/useQueryPostShow'

const PostShow: VFC<any> = (id) => {
  // const id = match.params.postId
  
  const { status, data } = useQueryPostShow(id.id)
  const post = data?.post
  const spot = data?.spot
  const image_url = data?.image_url
  
  let map_url = ''

  if(status == 'success'){
  map_url = `https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=17&q=${spot.name} ${spot.place}`
  }
  
  let genres = post?.genre  

  if(genres){
    genres = genres.split(',')
    genres = genres.slice(0,5)
  }else {
    genres = null
  }

  // if (status === 'loading') return (<div className='absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2'><CircularProgress/></div>)
  if(status === 'loading')
  return (
  <div className='absolute bottom-1/2 left-44 md:bottom-1/2 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10'>
    <CircularProgress/>
    </div>)

  if (status === 'error') return <div>{'Error'}</div>
  
  return (
    <div className='w-full lg:w-11/12 lg:mx-auto'>
      <h2 className='mt-10 text-4xl text-gray-700 font-bold text-center'>{post.title}</h2>
      <hr className='w-16 mx-auto mt-2 border-blue-600'/>
      <p className='mt-4 text-lg text-gray-600 text-center'>{post.created_at.substring(0,post.created_at.indexOf('T'))}</p>
      <div className="flex my-4 overflow-x-auto">
          <div className="bg-red-200  rounded-md p-2 text-center mx-2 whitespace-nowrap">
            {post.with}
          </div>
          {genres?.map((genre:string,index:number) => (
          <div className="bg-green-200 mx-2 rounded-md p-2 whitespace-nowrap" key={index}>
          {genre}
          </div>
          ))} 
          </div>
      <h3 className='border border-blue-600 text-blue-600 rounded-md text-center p-1 text-lg mx-2 my-2 whitespace-nowrap overflow-x-auto md:text-2xl md:p-2'>{spot.name}</h3>
      <img src={image_url} className='block mx-auto object-cover w-full' alt="" />
      <div className='mt-3 px-2'>
      <h3 className="text-2xl font-bold bg-gray-100 p-2 border-blue-400 border-b">説明</h3>
      <p className="text-lg mt-4 pl-2">{post.caption}</p>
      </div>
      
      <div className='mt-3 px-2'>
      <h3 className="text-2xl font-bold bg-gray-100 p-2 border-blue-400 border-b">マップ情報</h3>
      <div className='pl-2'>
      <h4 className='border-b font-bold text-xl mt-4 pb-1'>スポット名</h4>
      <p className='text-lg pt-2'>{spot.name}</p>
      <h4 className='border-b font-bold text-xl mt-2 pb-1'>場所</h4>
      <p className='text-lg pt-2'>{spot.place_detail}</p>
      <h4 className='border-b font-bold text-xl mt-2 pb-1'>ウェブサイト</h4>
      {spot.web_url ?
      <a className='text-blue-700 pt-2 block text-lg' href={spot.web_url}>{spot.name}</a>
      :
      <p>ウェブサイトが見つかりませんでした。</p>
      }
      </div>
      </div>
      <iframe className='mt-4' src={map_url}  scrolling="no" width="100%" height="600"></iframe>

    </div>
  )
}

export default PostShow

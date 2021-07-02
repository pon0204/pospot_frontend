import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { useQueryPosts } from '../../../hooks/reactQuery/useQueryPosts'
import { selectFollowsCount } from '../../../slices/followSlice'
import { PostCard } from '../../posts/PostCards/PostCard'
import ProfileTabs from './ProfileTabs'

const ProfileShowPosts = (id:any) => {
  const { status, data } = useQueryPosts()
  const [currentPosts,setCurrentPosts] = useState<any>()
  const [likesPosts,setLikesPosts] = useState<any>()
  const [query, setQuery] = useState(0);
  const followsCount = useAppSelector(selectFollowsCount)
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setQuery(newValue);
  };  

  useEffect(() =>{
      if(query == 0){
      const currentPost = data?.posts?.filter((v:any) => v.user_id == id.id)
      setCurrentPosts(currentPost)
      }else if(query == 1){
        // いいねしている投稿のみ取得        
        const LikePosts = data?.posts?.filter((v:any) => v.likes.some((v:any) => v.user_id == id.id) == true)
      setLikesPosts(LikePosts)
      }
  },[query,status])

  if (status === 'loading') return (<div></div>  )
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <div>
        <div className='border-t border-b h-20 mt-4 flex text-center align-center items-center'>
        <p className='w-1/3'>投稿{currentPosts?.length}件</p>
        <p className='w-1/3'>フォロワー{followsCount.followersCount}人</p>
        <p className='w-1/3'>フォロー中{followsCount.followingsCount}人</p>
      </div>
      <div className="flex flex-wrap justify-center pb-12">
        {query == 0 ?
        currentPosts?.map((item:any) => (
          <PostCard item={item}/>
          ))
          :
          likesPosts?.map((item:any) => (
            <PostCard item={item}/>
            ))
          }
      </div>
          <ProfileTabs handleChange={handleChange} query={query}/>
    </div>
  )
}

export default ProfileShowPosts

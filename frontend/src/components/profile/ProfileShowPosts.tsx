import {useEffect,useState} from 'react'
import ProfileTabs from './ProfileTabs'
import { PostCard } from '../posts/PostCard'
import { useQueryPosts } from '../../hooks/reactQuery/useQueryPosts'
import { Height } from '@material-ui/icons'
import { convertToObject } from 'typescript'
import { useQueryClient, useMutation } from 'react-query'
import { EditPost, PostData } from '../../types/types'
import { resetFollow, selectFollowers, selectFollowsCount, selectFollowsId } from '../../slices/followSlice'
import { useAppSelector,useAppDispatch } from '../../app/hooks'


const ProfileShowPosts = (id:any) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const { status, data } = useQueryPosts()
  const [currentPosts,setCurrentPosts] = useState<any>()
  const [likesPosts,setLikesPosts] = useState<any>()
  const [query, setQuery] = useState(0);
  const dispatch = useAppDispatch()
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
      <ProfileTabs handleChange={handleChange} query={query}/>
      <div className="flex flex-wrap justify-center">
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
    </div>
  )
}

export default ProfileShowPosts

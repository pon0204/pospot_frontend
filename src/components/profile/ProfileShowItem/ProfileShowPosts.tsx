import { useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectFollowsCount } from '../../../slices/followSlice'
import ProfileShowPostsCurrent from './ProfileShowPostsCurrent'
import ProfileShowPostsLike from './ProfileShowPostsLike'
import ProfileTabs from './ProfileTabs'

const ProfileShowPosts = (id: any) => {
  const [query, setQuery] = useState(0)
  const followsCount = useAppSelector(selectFollowsCount)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setQuery(newValue)
  }

  return (
    <div>
      <div className="border-t border-b h-20 mt-4 flex text-center align-center items-center">
        {/* <p className='w-1/3'>投稿{currentPosts?.length}件</p> */}
        <p className="w-1/2">フォロワー{followsCount.followersCount}人</p>
        <p className="w-1/2">フォロー中{followsCount.followingsCount}人</p>
      </div>
      <div className="flex flex-wrap justify-center pb-12">
        {query == 0 ? (
          <ProfileShowPostsCurrent id={id.id} />
        ) : (
          <ProfileShowPostsLike id={id.id} />
        )}
      </div>
      <ProfileTabs handleChange={handleChange} query={query} />
    </div>
  )
}

export default ProfileShowPosts

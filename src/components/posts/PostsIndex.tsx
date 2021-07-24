import AddIcon from '@material-ui/icons/Add'
import React, { useEffect, useState, VFC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import useGaTrackPage from '../../hooks/castomHook/useGaTrackPage'
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows'
import { resetQueryGenre, resetQueryPlace } from '../../slices/postSlice'
import { AutoCompGenre } from './PostIndexItem/AutoCompGenre'
import { AutoCompPlace } from './PostIndexItem/AutoCompPlace'
import PostsFollow from './PostIndexItem/PostsFollow'
import PostsIndexTabs from './PostIndexItem/PostsIndexTabs'
import PostsNew from './PostIndexItem/PostsNew'

const PostsIndex: VFC = () => {
  const currentUserId = localStorage.getItem('currentUserId')
  useQueryFollows(currentUserId)
  const dispatch = useAppDispatch()
  const location = useLocation()
  useGaTrackPage(location.pathname)

  const [tabState, setTabState] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabState(newValue)
  }

  useEffect(() => {
    return () => {
      dispatch(resetQueryGenre())
      dispatch(resetQueryPlace())
    }
  }, [])

  return (
    <div className="pb-28 pt-10">
      <div className="md:flex md:justify-center pb-8">
        <AutoCompGenre />
        <AutoCompPlace />
      </div>
      {tabState == 0 ? <PostsNew /> : <PostsFollow />}
      <PostsIndexTabs handleChange={handleChange} tabState={tabState} />
      <div className="bottom-20 right-6 lg:right-20 bg-opacity-90 fixed z-50 bg-blue-900 rounded-full">
        <Link to="/posts/new" className="block p-4">
          <AddIcon style={{ fontSize: 52, color: 'white' }} />
        </Link>
      </div>
    </div>
  )
}

export default PostsIndex

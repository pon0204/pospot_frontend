import React, {VFC,useState} from 'react'
import { useQueryPosts } from '../../hooks/reactQuery/useQueryPosts'
import { Link } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import PostsFollow from './PostIndexItem/PostsFollow';
import PostsAll from './PostIndexItem/PostsAll';
import PostsIndexTabs from './PostIndexItem/PostsIndexTabs';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AutoCompGenre } from './PostIndexItem/AutoCompGenre';
import { AutoCompPlace } from './PostIndexItem/AutoCompPlace';
import { useAppDispatch } from '../../app/hooks';
import { resetQueryGenre, resetQueryPlace } from '../../slices/postSlice';
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows';
import { useEffect } from 'react';

const PostsIndex: VFC = () => {    
  const { status, data } = useQueryPosts()
  const currentUserId = localStorage.getItem('currentUserId')
  useQueryFollows(currentUserId)
  const dispatch = useAppDispatch()
  const [tabState,setTabState] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabState(newValue);
  };  

  useEffect(() => {
    return () =>{
      dispatch(resetQueryGenre())
      dispatch(resetQueryPlace())
      }
  }, [])

    if (status === 'loading') return (<div className='absolute top-1/2 right-1/2'><CircularProgress/></div>)
    if (status === 'error') return (<div>{'Error'}</div>)
    
  return (
    <>
    {/* <PostsGenreState/> */}
    <div className='py-2 md:flex md:justify-center'>
    <AutoCompGenre/>
    <AutoCompPlace/>
    </div>
    {tabState == 0 ?
    <PostsAll/>
    :
    <PostsFollow/>  
    }
    <PostsIndexTabs handleChange={handleChange} tabState={tabState}/>
    <Link to='posts/new' className='fixed p-4 bg-gray-400 bg-opacity-30 rounded-full' style={{right: '5%',bottom: '5%'}}>
    <CreateIcon style={{fontSize: 52}} color='primary'/>
    </Link>
    </>
  )
}

export default PostsIndex

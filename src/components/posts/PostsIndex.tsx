import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows';
import { useQueryPosts } from '../../hooks/reactQuery/useQueryPosts';
import { resetQueryGenre, resetQueryPlace } from '../../slices/postSlice';
import { AutoCompGenre } from './PostIndexItem/AutoCompGenre';
import { AutoCompPlace } from './PostIndexItem/AutoCompPlace';
import PostsAll from './PostIndexItem/PostsAll';
import PostsFollow from './PostIndexItem/PostsFollow';
import PostsIndexTabs from './PostIndexItem/PostsIndexTabs';

const PostsIndex: VFC = () => {    
  const { status } = useQueryPosts()
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

    if (status === 'loading') return (<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><CircularProgress/></div>)
    if (status === 'error') return (<div>{'Error'}</div>)
    
  return (
    <div className='pt-2 pb-28'>
    <div className='md:flex md:justify-center'>
    <AutoCompGenre/>
    <AutoCompPlace/>
    </div>
    {tabState == 0 ?
    <PostsAll/>
    :
    <PostsFollow/>  
    }
    <PostsIndexTabs handleChange={handleChange} tabState={tabState}/>
    <div className='fixed bottom-20 right-6 lg:right-20 bg-opacity-30 bg-blue-300 rounded-full'>
    <Link to='posts/new' className='p-4 block'>
    <AddIcon style={{fontSize: 52}} color='primary'/>
    </Link>
    </div>
    </div>
  )
}

export default PostsIndex

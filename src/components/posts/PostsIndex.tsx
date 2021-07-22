import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useQueryFollows } from '../../hooks/reactQuery/useQueryFollows';
import { resetQueryGenre, resetQueryPlace } from '../../slices/postSlice';
import { AutoCompGenre } from './PostIndexItem/AutoCompGenre';
import { AutoCompPlace } from './PostIndexItem/AutoCompPlace';
import PostsFollow from './PostIndexItem/PostsFollow';
import PostsIndexTabs from './PostIndexItem/PostsIndexTabs';
import PostsNew from './PostIndexItem/PostsNew';

const PostsIndex: VFC = () => {    
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
    
  return (
    <div className='pt-10 pb-28'>
    <div className='md:flex md:justify-center pb-8'>
    <AutoCompGenre/>
    <AutoCompPlace/>
    </div>
    {tabState == 0 ?
    <PostsNew/>
    :
    <PostsFollow/>  
    }
    <PostsIndexTabs handleChange={handleChange} tabState={tabState}/>
    <div className='fixed z-50 bottom-20 right-6 lg:right-20 bg-opacity-90 bg-blue-900 rounded-full'>
    <Link to='/posts/new' className='p-4 block'>
    <AddIcon style={{fontSize: 52,color:'white'}}/>
    </Link>
    </div>
    </div>
  )
}

export default PostsIndex

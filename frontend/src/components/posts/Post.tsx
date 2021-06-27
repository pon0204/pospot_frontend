import React, {VFC} from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useQueryPosts } from '../../hooks/reactQuery/useQueryPosts'
import { Link } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from "../../app/hooks";
import { useEffect } from 'react';
import axios from 'axios';
import {PostCard} from './PostCard';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { PostData } from '../../types/types';
import CreateIcon from '@material-ui/icons/Create';
import { selectHeaders } from '../../slices/headersSlice';
import { useQueryProfiles } from '../../hooks/reactQuery/useQueryProfiles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center'
  },
  margin: {
    margin: 10,
  },
}));


const Post: VFC = () => {    
  const classes = useStyles();
  // const { status, data } = useQueryPosts()

  
  const {status,data} = useQueryPosts()

    if (status === 'loading') return (
      <div className="flex justify-center flex-wrap">
        <Skeleton className={classes.margin} variant="rect" width={385} height={500} />
        <Skeleton className={classes.margin} variant="rect" width={385} height={500} />
        <Skeleton className={classes.margin} variant="rect" width={385} height={500} />
        <Skeleton className={classes.margin} variant="rect" width={385} height={500} />
        <Skeleton className={classes.margin} variant="rect" width={385} height={500} />
        <Skeleton className={classes.margin} variant="rect" width={385} height={500} />
      </div>
    )
    if (status === 'error') return <div>{'Error'}</div>
    
  return (
    <>
    <div className="flex flex-wrap justify-center">
      {data.posts?.map((item:any) => (
          <PostCard item={item}/>
      ))}
    </div>
    <Link to='posts/new' className='fixed p-4 bg-gray-400 bg-opacity-30 rounded-full' 
    style={{
      right: '5%',
      bottom: '5%'
    }}>
    <CreateIcon style={{fontSize: 52}} color='primary'/>
    </Link>
    </>
  )
}

export default Post

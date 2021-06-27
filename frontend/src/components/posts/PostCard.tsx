import React ,{useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";
import {useMutatePost} from '../../hooks/castomHook/useMutatePost'
import { useAuth0 } from "@auth0/auth0-react";
import zIndex from '@material-ui/core/styles/zIndex';
import CardMenu from './CardMenu';
import defaultPhoto from '../../profile_default.png'
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    card:{
      margin: 10,
      width: 400,
      height: 450,
      position: 'relative',
    },
    button: {
      ':focus':{
        outline: 'none'
      }
    }
  }),

);


const options = [
  'Edit',
  'Delete',
];


export const PostCard = (item:any,profiles:any) => {

  const currentUserId = localStorage.getItem('currentUserId')

  const [heart,setHeart] = useState(false)

  const classes = useStyles();
  const { deletePostMutation } = useMutatePost()
  const { user, isAuthenticated, getAccessTokenSilently }:any = useAuth0();

  const Click = () =>{
    setHeart((prev) => !prev)  
  }
  
  let title = item.item.title
  let withData = item.item.with
  let genres = item.item.genre  
  let caption = item.item.caption

  if(title.length > 14){
    title = title.substr(0,14) + '...'
  }

  if(caption.length > 64){
    caption = caption.substr(0,64) + '...'
  }
  

  if(withData == ''){
    withData = null
  }


  if(genres){
    genres = genres.split(',')
    genres = genres.slice(0,3)
  }else {
    genres = null
  }

  return (
    <div className={classes.card}>
      <Link to={`/posts/${item.item.id}`}>
        <div className='w-full h-full border z-0 relative'>
          <div className='flex pt-4 pl-4'>
            <Link to={`/profile/${item.item.user_id}`}>
            <div className='border-2 border-gray-300 relative cursor-pointer w-16 h-16 block rounded-full mx-auto' >
          {item.item.avatar_url == null ?
          <img src={defaultPhoto} className='rounded-full' alt="" />
          :
        // <img src={defaultPhoto} className='rounded-full' alt="" />
          <img src={item.item.avatar_url} className='rounded-full' alt="" />
        
    }
    </div>
              </Link>
            <div className='ml-4 py-2'>
            <h3 className='font-bold'>{title}</h3>
            <p className='text-gray-600'>{item.item.created_at.substring(0,item.item.created_at.indexOf('T'))}</p>
            </div>
          </div>
          <div className="flex my-4">
          {genres?.map((genre:string) => (
          <div className="bg-green-200 mx-2 rounded-md p-1 text-sm">
          {genre}
          </div>
          ))} 
          { withData && (
            <div className="bg-red-200  rounded-md p-1 text-sm text-center mx-2">
          {withData}
          </div>
          )} 
          </div>
        <img  className='block w-full object-cover h-48' src={item.item.image_url} alt="" />
        <p className='p-2 text-'>{caption}</p>
        </div>
      </Link>
      {
      currentUserId == item.item.user_id &&(
      <div className='absolute top-2 right-2 z-10'>
       <CardMenu/>
      </div>
      )
      }
        <div className='absolute right-2 bottom-2 z-10'>
          { heart ? 
          <IconButton onClick={Click} style={{outline: 'none'}}>
            <FavoriteIcon color='secondary' style={{ fontSize: 32 }}/>
          </IconButton>
          : 
          <IconButton onClick={Click} style={{outline: 'none'}}>
            <FavoriteBorderIcon color='secondary' style={{ fontSize: 32 }}/>
          </IconButton>
          }
        </div>
    </div>
  );
}

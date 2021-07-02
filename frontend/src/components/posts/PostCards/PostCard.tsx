import React ,{useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";
import {useMutatePost} from '../../../hooks/castomHook/useMutatePost'
import { useAuth0 } from "@auth0/auth0-react";
import zIndex from '@material-ui/core/styles/zIndex';
import CardMenu from './CardMenu';
import defaultPhoto from '../../../profile_default.png'
import { IconButton } from '@material-ui/core';
import { useEffect } from 'react';
import { useMutateLike } from '../../../hooks/castomHook/useMutateLike';
import RoomIcon from '@material-ui/icons/Room';


const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    card:{
      margin: 10,
      width: 400,
      height: 465,
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
  const [likeHeart,setHeart] = useState(false)
  const classes = useStyles();
  const {createLikeMutation,deleteLikeMutation} = useMutateLike()
  const {isAuthenticated,loginWithRedirect,logout } = useAuth0();
  
  const heartClick = () =>{
    setHeart((prev) => !prev)  
  }
  
  useEffect(() => {
    const likes = item.item.likes
    const currentUserLike = likes.some((v:any) => v.user_id == currentUserId)
    setHeart(currentUserLike)
  },[])
  
  let title = item.item.title
  let withData = item.item.with
  let genres = item.item.genre  
  let caption = item.item.caption
  let spot_name = item.item.spot_name

  if(title.length > 14){
    title = title.substr(0,14) + '...'
  }

  if(caption.length > 47){
    caption = caption.substr(0,47) + '...'
  }

  if(spot_name.length > 28){
    spot_name = spot_name.substr(0,28) + '...'
  }

  if(withData == ''){
    withData = null
  }

  if(genres){
    genres = genres.slice(0,3)
  }else {
    genres = null
  }

  return (
    <div className={classes.card}>
      <Link to={`/posts/${item.item.id}`}>
        <div className='w-full h-full border z-0 relative'>
          <div className='flex pt-2 pl-4'>
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
            <h3 className='font-bold text-lg'>{title}</h3>
            <p className='text-gray-600'>{item.item.created_at.substring(0,item.item.created_at.indexOf('T'))}</p>
          </div>
        </div>
        <div className="flex mt-4 over overflow-hidden">
          { withData && (
          <div className="bg-red-200  rounded-md p-1 text-sm text-center mx-2 whitespace-nowrap">
          {withData}
          </div>
          )} 
          {genres?.map((genre:string) => (
          <div className="bg-green-200 mx-2 rounded-md p-1 text-sm whitespace-nowrap">
          {genre}
          </div>
          ))} 
          </div>
        {/* <div className='overflow-x-auto'> */}
        <h3 className='text-center p-1 text-lg font-bold w-11/12 mx-auto my-2 text-white bg-blue-600 whitespace-nowrap overflow-auto'>{spot_name}</h3>
        {/* </div> */}
        <img  className='block w-full object-cover h-48' src={item.item.image_url} alt="" />
        <p className='p-2'>{caption}</p>
        <p className='absolute bottom-2 left-2 bg-gray-600 text-white p-1 pr-2'><RoomIcon/> {item.item.place}</p>
        </div>
      </Link>
      {
      currentUserId == item.item.user_id &&(
      <div className='absolute top-2 right-2 z-10'>
      <CardMenu id={item.item.id}/>
      </div>
      )
      }
        <div className='absolute right-2 bottom-0 z-10'>
          { likeHeart ? 
          <IconButton onClick={() => {
            deleteLikeMutation.mutate(item.item.id)
            heartClick()
          }}
          style={{outline: 'none'}}>
            <FavoriteIcon color='secondary' style={{ fontSize: 32 }}/>
          </IconButton>
          : 
          <IconButton onClick={() => {
            if(isAuthenticated){
              createLikeMutation.mutate(item.item.id)
              heartClick()
              }else{
                loginWithRedirect()
              }
            }} 
            style={{outline: 'none'}}>
            <FavoriteBorderIcon color='secondary' style={{ fontSize: 32 }}/>
          </IconButton>
          }
        </div>
    </div>
  );
}

import React ,{useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";
import {useMutatePost} from '../../hooks/useMutatePost'
import { useAuth0 } from "@auth0/auth0-react";
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    card:{
      margin: 10,
      width: 400,
      height: 450,
      position: 'relative',
    }
  }),
);


const options = [
  'Edit',
  'Delete',
];


export const PostCard = (item:any) => {

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
            <div className='bg-blue-300 w-16 h-16 rounded-full'></div>
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
        <button onClick={Click} className='absolute right-2 bottom-2 z-10'>
          { heart ? 
          <FavoriteIcon color='secondary' style={{ fontSize: 32 }}/>
          : 
          <FavoriteBorderIcon color='secondary' style={{ fontSize: 32 }}/>
          }
        </button>
    </div>
  );
}

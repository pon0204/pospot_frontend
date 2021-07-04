import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RoomIcon from '@material-ui/icons/Room';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useMutateLike } from '../../../hooks/castomHook/useMutateLike';
import defaultPhoto from '../../../profile_default.png';
import PostShow from "../PostShow";
import CardMenu from './CardMenu';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    },
  }),
);

export const PostCard = (item:any) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const [likeHeart,setHeart] = useState(false)
  const classes = useStyles();
  const {createLikeMutation,deleteLikeMutation} = useMutateLike()
  const {loginWithRedirect } = useAuth0();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const smMediaWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const heartClick = () =>{
    setHeart((prev) => !prev)  
  }

  useEffect(() => {
    const likes = item.item.likes
    const currentUserLike = likes.some((like:any) => like.user_id == currentUserId)
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

  console.log(item.item.id)
  return (
    <div className={classes.card}>
      <button type="button" onClick={handleClickOpen('paper')} className='w-full h-full' style={{outline: 'none'}}>
        <div className='w-full h-full border z-0 relative text-left'>
          <div className='flex pt-2 pl-4'>
            <Link to={`/profile/${item.item.user_id}`}>
              <div className='border-2 border-gray-300 relative cursor-pointer w-16 h-16 block rounded-full mx-auto' >
              {item.item.avatar_url == null ?
              <img src={defaultPhoto} className='rounded-full' alt="" />
              :
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
        <h3 className='text-center p-1 text-lg font-bold w-11/12 mx-auto my-2 text-white bg-blue-600 whitespace-nowrap overflow-auto'>{spot_name}</h3>
        <img  className='block w-full object-cover h-48' src={item.item.image_url} alt="" />
        <p className='p-2'>{caption}</p>
        <p className='absolute bottom-2 left-2 bg-gray-600 text-white p-1 pr-2'><RoomIcon/> {item.item.place}</p>
        </div>
      </button>
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
            if(currentUserId){
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
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen={smMediaWidth}
        fullWidth={true}
        maxWidth='xl'
        >
        <DialogContent dividers={scroll === 'paper'} 
        style={{
          padding: '0px 4px 0px 4px',
        }}
        >
          {open &&
          <div style={{height: '90vh'}}>
            <PostShow id={item.item.id} style={{height: '90vh'}}/>
          </div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          <HighlightOffIcon style={{fontSize: 40}}/>
          </Button>
          { likeHeart ? 
          <IconButton onClick={() => {
            deleteLikeMutation.mutate(item.item.id)
            heartClick()
          }}
          style={{outline: 'none'}}>
            <FavoriteIcon color='secondary' style={{ fontSize: 40 }}/>
          </IconButton>
          : 
          <IconButton onClick={() => {
            if(currentUserId){
              createLikeMutation.mutate(item.item.id)
              heartClick()
              }else{
                loginWithRedirect()
              }
            }} 
            style={{outline: 'none'}}>
            <FavoriteBorderIcon color='secondary' style={{ fontSize: 40 }}/>
          </IconButton>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

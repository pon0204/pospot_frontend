import { useAuth0 } from "@auth0/auth0-react";
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import { useMutateUser } from '../hooks/castomHook/useMutateUser';
import { setHeaders } from '../slices/headersSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const {isAuthenticated,loginWithRedirect,logout } = useAuth0();
  const dispatch = useAppDispatch()
  const { getAccessTokenSilently }:any = useAuth0();
  const { userIdMutation } = useMutateUser()

  const removeUserId = () =>{
    localStorage.removeItem('currentUserId')
  }

  useEffect(() => {
    const getToken = async () => {
    try{
      const accessToken = await getAccessTokenSilently({
      });
      dispatch(setHeaders(accessToken))
      // if(!localStorage.getItem('currentUserId')){
      userIdMutation.mutate()
      // }
    }
    catch(e){
      console.log(e.message)
  } 
}
    getToken()
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <div className='h-14 p-4 flex justify-between'>
          <Link to="/posts">
            投稿一覧
          </Link>
          {isAuthenticated ?
          (
            <button className='text-right' color="inherit" onClick={() => 
            {
              logout({ returnTo: window.location.origin })
              removeUserId()
            }
            }
              >ログアウト</button>
          ):(
            <button className='text-right' color="inherit" onClick={loginWithRedirect}>ログイン</button>
          )
          }
        </div>
      </AppBar>
    </div>
  );
}
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth0 } from "@auth0/auth0-react";

import {  Link } from "react-router-dom";

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <div className='h-14 p-4 flex justify-between'>
          <Link to="/posts">
            投稿一覧
          </Link>
          {isAuthenticated ?
          (
            <button className='text-right' color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>ログアウト</button>
          ):(
            <button className='text-right' color="inherit" onClick={loginWithRedirect}>ログイン</button>
          )
          }
        </div>
      </AppBar>
    </div>
  );
}
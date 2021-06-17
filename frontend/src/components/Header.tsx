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
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/posts">
            投稿一覧
          </Link>
          <Link to="/posts/new">
            投稿作成
          </Link>
          {isAuthenticated ?
          (
            <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
          ):(
            <Button color="inherit" onClick={loginWithRedirect}>Login</Button>
          )
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
import React ,{useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {useMutatePost} from '../../hooks/useMutatePost'
import { Button } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";

const options = [
  'Edit',
  'Delete',
];

const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    root: {
      // maxWidth: 345,
      height: 450
    },
    genre: {
      fontSize: '16px'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export const PostCard = (item:any) => {
  const { deletePostMutation } = useMutatePost()
  const { user, isAuthenticated, getAccessTokenSilently }:any = useAuth0();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<any>(null);
  

  let genres = item.item.genre

  if(genres){
    genres = genres.split(',')
  }
  console.log(genres)

  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // menu用
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteClick = (id: number) => {
    deletePostMutation.mutate(id);
    setAnchorEl(null);
  }
  // if (deletePostMutation.isLoading){
  //   return <p></p>
  // }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
        isAuthenticated && (
          <>
          <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
  
          }}
        >
          {/* <Button>Edit</Button>
          <Button>Delete</Button> */}

            <MenuItem key="1" onClick={handleClose}>
              Edit
            </MenuItem>
            <MenuItem key="2" onClick={
              () => {deleteClick(item.item.id)}}>
              Delete
            </MenuItem>
        </Menu>
        </>
        )
        }
        title={item.item.title}

        // Y-M-Dのみに変換
        subheader={item.item.created_at.substring(0,item.item.created_at.indexOf("T"))}
      />
      <CardMedia
        className={classes.media}
        image={item.item.image_url}
        title="Paella dish"
      />
      <div className="flex mt-4">
        {genres?.map((genre:any) => (
        <div className="bg-green-200 mx-4 rounded-md p-1">
          {genre}
        </div>
      ))}
      </div>
        <div className="bg-red-200 mx-4 rounded-md p-1 w-10 text-center m-1">
        {item.item.with}
        </div>
        
      <CardContent>
        <Typography variant="body2" component="p">
        {item.item.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

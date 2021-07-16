import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPost, setEditedPost } from '../../../slices/postSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center'
  },
  margin: {
    // margin: theme.spacing(1),
      margin: '5px 0px'
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  title: {
    width: '100%'
  },
}));

export const InputForm = () => {
  const classes = useStyles();
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  return (
    <div>
    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
    {editedPost.title.length >= 51 ? 
      <TextField
        label='タイトル'
        value={editedPost.title}
        onChange={(e) => 
          dispatch(setEditedPost({ ...editedPost, title: e.target.value}))
        }
        variant="outlined"
        error
        helperText="50文字以下で入力してください"
        className={classes.margin}
      />     
      :
        <TextField
          label='タイトル'
          value={editedPost.title}
          onChange={(e) => 
            dispatch(setEditedPost({ ...editedPost, title: e.target.value}))
          }
          variant="outlined"
          className={classes.margin}
        />    
    }
    {editedPost.caption.length >= 401 ?
    <TextField
      label='説明'
      value={editedPost.caption}
      onChange={(e) => 
        dispatch(setEditedPost({ ...editedPost, caption: e.target.value}))
      }
      className={classes.margin}
      variant='outlined'
      multiline
      rows={5}
      error
      helperText="400文字以下で入力してください"
    /> 
    :
    <TextField
      label='説明'
      value={editedPost.caption}
      onChange={(e) => 
        dispatch(setEditedPost({ ...editedPost, caption: e.target.value}))
      }
      className={classes.margin}
      variant='outlined'
      multiline
      rows={5}
    /> 
    }
  </FormControl>
    </div>
  );
}

export default InputForm

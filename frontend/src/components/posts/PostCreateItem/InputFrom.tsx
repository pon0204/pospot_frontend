import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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
      margin: '10px 0px'
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
    <InputLabel>タイトル</InputLabel>
    <OutlinedInput
      value={editedPost.title}
      onChange={(e) => 
        dispatch(setEditedPost({ ...editedPost, title: e.target.value}))
      }
      labelWidth={70}
    />     
    </FormControl>
    <FormControl className={clsx(classes.margin,classes.textField)} variant="outlined">
    <InputLabel>説明</InputLabel>
    <OutlinedInput
      value={editedPost.caption}
      onChange={(e) => 
        dispatch(setEditedPost({ ...editedPost, caption: e.target.value}))
      }
      multiline
      rows={5}
      labelWidth={70}
    />    
  </FormControl>
    </div>
  );
}

export default InputForm

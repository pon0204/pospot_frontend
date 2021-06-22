
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Box} from '@material-ui/core'
import Button from '@material-ui/core/Button' 
import axios from 'axios';

import React, {VFC,useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setEditedPost, selectPost } from '../../../slices/postSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center'
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '50ch',
  },

  inputLabel:{
    display: 'block',
    position: 'relative',
    backgroundColor: '#1877F2',
    color: '#fff',
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'all 0.5s',
    width: '50%',
    margin: '30px auto 0px auto',
    cursor: 'pointer',
    '&:hover':{
      backgroundColor: '#004db1'
    },
  },
  inputFile: {
    display: 'none'
  },
  img:{
    width: '91%',
    height: '250px',
    margin: '15px auto',
    display: 'block',
    objectFit: 'cover'

  }
}));

const FormFile:VFC = () => {
  const classes = useStyles();
  const [fileUrl, setFileUrl] = useState<string>('');
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  const imageChange = (event:any) => {
    const image = event.target.files[0];
    const imageUrl:any = URL.createObjectURL(image);
    setFileUrl(imageUrl)
    dispatch(setEditedPost({ ...editedPost, eyecatch: image}))
  }

  return (
    <div>
    <label htmlFor='file' className={classes.inputLabel}>アイキャッチ</label>
        <input className={classes.inputFile} onChange={imageChange} type="file" id="file" name="file" accept="image/png,image/jpg"/>
      {
      fileUrl && (
      <img src={fileUrl} className={classes.img}/>
      )
      } 
    </div>
  )
}

export default FormFile

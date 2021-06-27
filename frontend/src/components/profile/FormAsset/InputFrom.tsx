import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';

import { useAppSelector, useAppDispatch } from '../../../app/hooks'

import { useMutatePost } from '../../../hooks/castomHook/useMutatePost'
import { selectProfile, setEditedProfile } from '../../../slices/profileSlice';


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

}));

export const InputForm = () => {
  const classes = useStyles();
  const editedProfile = useAppSelector(selectProfile)

  const dispatch = useAppDispatch()

  return (
    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
    <InputLabel>ニックネーム</InputLabel>
    <OutlinedInput
      value={editedProfile.nickname}
      onChange={(e) => 
        dispatch(setEditedProfile({ ...editedProfile, nickname: e.target.value}))
      }
      labelWidth={100}
    />     
    <FormControl className={clsx(classes.margin,classes.textField)} variant="outlined">
    <InputLabel>自己紹介</InputLabel>
    <OutlinedInput
      value={editedProfile.introduction}
      onChange={(e) => 
        dispatch(setEditedProfile({ ...editedProfile, introduction: e.target.value}))
      }
      multiline
      rows={5}
      labelWidth={70}
    />
  </FormControl>
    
  </FormControl>
  );
}

export default InputForm

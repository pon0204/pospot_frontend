import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProfile, setEditedProfile } from '../../../slices/profileSlice';


const useStyles = makeStyles((theme) => ({

  margin: {
    // margin: theme.spacing(1),
      margin: '10px 0px'
  },
  textField: {
    width: '100%',
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

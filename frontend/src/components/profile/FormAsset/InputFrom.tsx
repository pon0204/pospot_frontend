import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
    <div>
    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
    {editedProfile.nickname.length >= 51 ? 
      <TextField
        label='ニックネーム'
        value={editedProfile.nickname}
        onChange={(e) => 
          dispatch(setEditedProfile({ ...editedProfile, nickname: e.target.value}))
        }
        variant="outlined"
        error
        helperText="50文字以下で入力してください"
        className={classes.margin}
      />     
      :
        <TextField
          label='ニックネーム'
          value={editedProfile.nickname}
          onChange={(e) => 
            dispatch(setEditedProfile({ ...editedProfile, nickname: e.target.value}))
          }
          variant="outlined"
          className={classes.margin}
        />    
    }
    {editedProfile.introduction.length >= 201 ?
    <TextField
      label='自己紹介'
      value={editedProfile.introduction}
      onChange={(e) => 
        dispatch(setEditedProfile({ ...editedProfile, introduction: e.target.value}))
      }
      className={classes.margin}
      variant='outlined'
      multiline
      rows={5}
      error
      helperText="200文字以下で入力してください"
    /> 
    :
    <TextField
      label='自己紹介'
      value={editedProfile.introduction}
      onChange={(e) => 
        dispatch(setEditedProfile({ ...editedProfile, introduction: e.target.value}))
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

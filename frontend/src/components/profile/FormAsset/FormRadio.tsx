import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setEditedPost, selectPost } from '../../../slices/postSlice'
import { useMutatePost } from '../../../hooks/castomHook/useMutatePost'
import { selectProfile, setEditedProfile } from '../../../slices/profileSlice';

export const FormRadio = () => {
  const editedProfile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  return (
    <div className='full-width mt-10 text-center'>
    <FormControl component="fieldset">
      <FormLabel component="legend">性別</FormLabel>
      <RadioGroup row aria-label="with" name="with" value={editedProfile.gender} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setEditedProfile({...editedProfile, gender: e.target.value}))
      }>
        <FormControlLabel value="男性" control={<Radio />} label="男性" />
        <FormControlLabel value="女性" control={<Radio />} label="女性" />
      </RadioGroup>
    </FormControl>
    </div>
  );
}
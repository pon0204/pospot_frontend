import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
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
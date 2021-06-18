import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setEditedPost, selectPost } from '../../../slices/postSlice'
import { useMutatePost } from '../../../hooks/useMutatePost'

export const FormRadio = () => {
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  return (
    <div>
    <FormControl component="fieldset">
      <FormLabel component="legend">誰と</FormLabel>
      <RadioGroup row aria-label="with" name="with" value={editedPost.post.with} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setEditedPost({...editedPost.post, with: e.target.value}))
      }>
        <FormControlLabel value="1人" control={<Radio />} label="1人" />
        <FormControlLabel value="カップル" control={<Radio />} label="カップル" />
        <FormControlLabel value="友達" control={<Radio />} label="友達" />
        <FormControlLabel value="家族" control={<Radio />} label="家族" />
      </RadioGroup>
    </FormControl>
    </div>
  );
}
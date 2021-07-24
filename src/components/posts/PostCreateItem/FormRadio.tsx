import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectPost, setEditedPost } from '../../../slices/postSlice'

export const FormRadio = () => {
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  return (
    <div className="full-width mt-4">
      <FormControl component="fieldset">
        <FormLabel component="legend">誰と行くといい?</FormLabel>
        <RadioGroup
          row
          aria-label="with"
          name="with"
          value={editedPost.with}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setEditedPost({ ...editedPost, with: e.target.value }))
          }
        >
          <FormControlLabel value="誰でも" control={<Radio />} label="誰でも" />
          <FormControlLabel value="1人" control={<Radio />} label="1人" />
          <FormControlLabel
            value="カップル"
            control={<Radio />}
            label="カップル"
          />
          <FormControlLabel value="友達" control={<Radio />} label="友達" />
          <FormControlLabel value="家族" control={<Radio />} label="家族" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

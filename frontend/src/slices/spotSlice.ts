import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post,EditPost} from '../types/types'


export interface PostState {
  editedPost: EditPost
  // editedTag: Tag
}

const initialState: any = {
  editedSpot: {
    spot: {
    name: '',
    web_url: '',
    map_url: '',
    place: '',
    place_id: '',
    }
  }
}

export const spotSlice = createSlice({
  name: 'spot',
  initialState,
  reducers: {
    setEditedSpot: (state, action: PayloadAction<any>) => {
      state.editedSpot.spot = action.payload.spot
    },
    resetEditedSpot: (state) => {
      state.editedSpot.spot = initialState.editedSpot.spot
    },
  },
})

export const { setEditedSpot, resetEditedSpot} =
  spotSlice.actions

  export const selectSpot = (state: RootState) => state.spot.editedSpot

export default spotSlice.reducer;

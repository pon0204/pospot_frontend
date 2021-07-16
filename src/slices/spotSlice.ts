import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { EditSpot } from '../types/types';


export interface SpotState {
  editedSpot: EditSpot
}

const initialState: SpotState = {
  editedSpot: {
    spot: {
    name: '',
    web_url: '',
    map_url: '',
    place: '',
    place_detail:'',
    place_id: '',
    },
    id: null
  }
}

export const spotSlice = createSlice({
  name: 'spot',
  initialState,
  reducers: {
    setEditedSpot: (state, action: PayloadAction<EditSpot>) => {
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

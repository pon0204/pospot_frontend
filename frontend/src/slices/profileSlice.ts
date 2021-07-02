import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { EditProfile } from '../types/types';

export interface profileState {
  editedProfile: EditProfile
}

const initialState: profileState = {
  editedProfile: {
    nickname: '',
    introduction: '',
    gender: '',
    avatar_url: '',
},
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setEditedProfile: (state, action: PayloadAction<EditProfile>) => {
      state.editedProfile = action.payload
    },
    resetEditedProfile: (state) => {
      state.editedProfile = initialState.editedProfile
    },
  },
})

export const { setEditedProfile, resetEditedProfile} =
  profileSlice.actions

  export const selectProfile = (state: RootState) => state.profile.editedProfile

export default profileSlice.reducer;

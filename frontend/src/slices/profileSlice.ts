import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {} from '../types/types'


export interface profileState {
  editedProfile: any
  showProfile: any


  // editedTag: Tag
}

const initialState: profileState = {
  editedProfile: {
    nickname: '',
    introduction: '',
    gender: '',
    avatar: '',
},
  showProfile: {
    profiles:{
      id: null,
      user_id: null,
      title: '',
      caption: '',
      with: '',
      genre: '',
      created_at: '',
      updated_at: ''
    }
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setShowProfile:(state, action: PayloadAction<any>) => {
      state.showProfile = action.payload
    },
    setEditedProfile: (state, action: PayloadAction<any>) => {
      state.editedProfile = action.payload
    },
    resetEditedProfile: (state) => {
      state.editedProfile = initialState.editedProfile
    },
    
  },
})

export const { setEditedProfile, resetEditedProfile, setShowProfile} =
  profileSlice.actions

  export const selectProfile = (state: RootState) => state.profile.editedProfile
  export const selectShowProfile = (state: RootState) => state.profile.showProfile

export default profileSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { EditProfile } from '../types/types'

export interface profileState {
  editedProfile: EditProfile
  currentAvatar: string
}

const initialState: profileState = {
  editedProfile: {
    nickname: '',
    introduction: '',
    gender: '',
    avatar_url: '',
    avatar: {name:'', lastModified: 0},
  },
  currentAvatar: '',
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
    setCurrentAvatar: (state, action: PayloadAction<string>) => {
      state.currentAvatar = action.payload
    },
  },
})

export const { setEditedProfile, resetEditedProfile, setCurrentAvatar } =
  profileSlice.actions

export const selectProfile = (state: RootState) => state.profile.editedProfile
export const selectAvatar = (state: RootState) => state.profile.currentAvatar

export default profileSlice.reducer

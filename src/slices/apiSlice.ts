import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface apiState {
  apiLoading: boolean
}

const initialState: apiState = {
  apiLoading : false
}

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApiLoading: (state) => {
      state.apiLoading = true
    },
    resetApiLoading: (state) => {
      state.apiLoading = initialState.apiLoading
    },
  },
})

export const {setApiLoading ,resetApiLoading} =
  apiSlice.actions
  export const selectLoading = (state: RootState) => state.api.apiLoading

export default apiSlice.reducer;

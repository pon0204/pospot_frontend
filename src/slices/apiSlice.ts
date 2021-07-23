import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface apiState {
  apiLoading: boolean
  apiLoadingOther: boolean
}

const initialState: apiState = {
  apiLoading: false,
  apiLoadingOther: false,
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
    setApiLoadingOther: (state) => {
      state.apiLoadingOther = true
    },
    resetApiLoadingOther: (state) => {
      state.apiLoadingOther = initialState.apiLoadingOther
    },
  },
})

export const {
  setApiLoading,
  resetApiLoading,
  setApiLoadingOther,
  resetApiLoadingOther,
} = apiSlice.actions
export const selectLoading = (state: RootState) => state.api.apiLoading
export const selectLoadingOther = (state: RootState) =>
  state.api.apiLoadingOther

export default apiSlice.reducer

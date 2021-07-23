import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface headers {
  Authorization: string | null
  'Content-Type': 'application/json'
}

export interface headersState {
  headers: headers
}

const initialState: headersState = {
  headers: {
    Authorization: null,
    'Content-Type': 'application/json',
  },
}

export const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers.Authorization = action.payload
    },
  },
})

export const { setHeaders } = headersSlice.actions

export const selectHeaders = (state: RootState) => state.headers

export default headersSlice.reducer

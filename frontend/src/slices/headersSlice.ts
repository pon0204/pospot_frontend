import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface TokenState {
  token: string
}

const initialState:any = {  
  headers: {
    Authorization: null,
    'Content-Type': 'application/json',
    // "sub": 'google-oauth2|106160814069089305764'
  }
}

export const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {

    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers.Authorization = action.payload
    }
  }
})

export const { setHeaders } = headersSlice.actions

export const selectHeaders = (state: RootState) => state.headers

export default headersSlice.reducer;
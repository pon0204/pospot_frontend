import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
// import { EditTask, Tag } from '../types/types'

export interface TokenState {
  token: string
}

// export interface TaskState {
//   editedTask: EditTask
//   editedTag: Tag
// }

const initialState:any = {  
  token: 'ありがとう'
  }


// export const userTokenSlice = createSlice({
//   name:'userToken',

// })

export const userTokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  }
})

export const { setToken } = userTokenSlice.actions

export const selectUserToken = (state: RootState) => state.token.token

export default userTokenSlice.reducer;
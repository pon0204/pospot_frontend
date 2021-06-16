import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userTokenReducer from '../slices/userToken'
import postReducer from '../slices/postSlice'

export const store = configureStore({
  reducer: {
    token: userTokenReducer,
    post: postReducer
  },


});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

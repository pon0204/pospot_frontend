import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userTokenReducer from '../slices/userToken'
import postReducer from '../slices/postSlice'
import spotReducer from '../slices/spotSlice'

export const store = configureStore({
  reducer: {
    token: userTokenReducer,
    post: postReducer,
    spot: spotReducer
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

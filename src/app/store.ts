import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import followReducer from '../slices/followSlice';
import headersReducer from '../slices/headersSlice';
import postReducer from '../slices/postSlice';
import profileReducer from '../slices/profileSlice';
import spotReducer from '../slices/spotSlice';

export const store = configureStore({
  reducer: {
    headers: headersReducer,
    post: postReducer,
    spot: spotReducer,
    profile: profileReducer,
    follows: followReducer
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

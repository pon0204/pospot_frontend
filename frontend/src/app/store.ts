import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userTokenReducer from '../slices/userToken'

export const store = configureStore({
  reducer: {
    token: userTokenReducer,
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

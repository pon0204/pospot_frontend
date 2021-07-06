import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { FollowCount, FollowersId, FollowingsId } from '../types/types';

export interface FollowState {
  followsCount:FollowCount
  followingsId: FollowingsId[]
  followersId: FollowersId[]
}

const initialState: FollowState = {
  followsCount:{
    followingsCount: null,
    followersCount: null,
  },
  followingsId:[{
    id: null
  }],
  followersId:[{
    id: null
  }]
  
}

export const followSlice = createSlice({

  name: 'follows',
  initialState,
  reducers: {
    setFollowsCount: (state, action: PayloadAction<any>) => {
      state.followsCount.followingsCount = action.payload.followings.length
      state.followsCount.followersCount = action.payload.followers.length
      state.followingsId = action.payload.followings
      state.followersId = action.payload.followers
      // state.follows = action.payload
    },
    resetFollow: (state) => {
      state.followsCount = initialState.followsCount
    },
  },
})

export const { setFollowsCount, resetFollow} =
  followSlice.actions

  export const selectFollowsCount = (state: RootState) => state.follows.followsCount
  export const selectFollowsId = (state: RootState) => state.follows.followingsId
  export const selectFollowers = (state: RootState) => state.follows.followersId

export default followSlice.reducer;

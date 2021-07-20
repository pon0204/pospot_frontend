import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { EditPost } from '../types/types';

export interface PostState {
  editedPost: EditPost
  queryGenre: string | null
  queryPlace: string | null
  page: number
}

const initialState: PostState = {
  editedPost: {
    title: '',
    caption: '',
    with: '誰でも',
    genre: '',
    eyecatch: '',
},
  queryGenre: null,
  queryPlace: null,
  page: 0
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setEditedPost: (state, action: PayloadAction<EditPost>) => {
      state.editedPost = action.payload
    },
    resetEditedPost: (state) => {
      state.editedPost = initialState.editedPost
    },
    setQueryGenre: (state, action: PayloadAction<string>) => {
      state.queryGenre = action.payload
    },
    resetQueryGenre: (state) => {
      state.queryGenre = initialState.queryGenre
    },
    setQueryPlace: (state, action: PayloadAction<string>) => {
      state.queryPlace = action.payload
    },
    resetQueryPlace: (state) => {
      state.queryPlace = initialState.queryPlace
    },
    incrementQueryPage: (state) => {
      state.page += 3
    },
    setQueryPage: (state) => {
      state.page = 3
    },
    resetQueryPage: (state) => {
      state.page = initialState.page
    },
  },
})

export const { setEditedPost, resetEditedPost,setQueryGenre,resetQueryGenre,setQueryPlace,resetQueryPlace,incrementQueryPage,resetQueryPage,setQueryPage} =
  postSlice.actions

  export const selectPost = (state: RootState) => state.post.editedPost
  export const selectQueryGenre = (state: RootState) => state.post.queryGenre
  export const selectQueryPlace = (state: RootState) => state.post.queryPlace
  export const selectPage = (state: RootState) => state.post.page

export default postSlice.reducer;

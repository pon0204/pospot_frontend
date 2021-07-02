import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { EditPost } from '../types/types';

export interface PostState {
  editedPost: EditPost
  showPost: any
  queryGenre: string  
  queryPlace: string  
}

const initialState: PostState = {
  editedPost: {
    title: '',
    caption: '',
    with: '誰でも',
    genre: '',
    eyecatch: '',

},
  showPost: {
    posts:{
      id: null,
      user_id: null,
      title: '',
      caption: '',
      with: '',
      genre: '',
      created_at: '',
      updated_at: ''
    }
  },
  queryGenre: '',
  queryPlace:''
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setShowPost:(state, action: PayloadAction<any>) => {
      state.showPost = action.payload
    },

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
    }
  },
})

export const { setEditedPost, resetEditedPost, setShowPost,setQueryGenre,resetQueryGenre,setQueryPlace,resetQueryPlace} =
  postSlice.actions

  export const selectPost = (state: RootState) => state.post.editedPost
  export const selectShowPost = (state: RootState) => state.post.showPost
  export const selectQueryGenre = (state: RootState) => state.post.queryGenre
  export const selectQueryPlace = (state: RootState) => state.post.queryPlace

export default postSlice.reducer;

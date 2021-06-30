import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { PostData,EditPost} from '../types/types'


export interface PostState {
  editedPost: EditPost
  showPost: any
  queryPostGenre: string  // editedTag: Tag
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
  queryPostGenre: ''
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
    setQueryPostGenre: (state, action: PayloadAction<string>) => {
      state.queryPostGenre = action.payload
    },
    resetQueryPostGenre: (state) => {
      state.queryPostGenre = initialState.queryPostGenre
    }
  },
})

export const { setEditedPost, resetEditedPost, setShowPost,setQueryPostGenre,resetQueryPostGenre} =
  postSlice.actions

  export const selectPost = (state: RootState) => state.post.editedPost
  export const selectShowPost = (state: RootState) => state.post.showPost
  export const selectQueryPostGenre = (state: RootState) => state.post.queryPostGenre

export default postSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post,EditPost} from '../types/types'


export interface PostState {
  editedPost: EditPost
  // editedTag: Tag
}

const initialState: any = {
  editedPost: {
    post: {
    title: '',
    caption: '',
    with: '',
    genre: ''
  }
}
}



export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setEditedPost: (state, action: PayloadAction<EditPost>) => {
      state.editedPost.post = action.payload
    },
    resetEditedPost: (state) => {
      state.editedPost.post = initialState.editedPost
    },
  },
})

export const { setEditedPost, resetEditedPost} =
  postSlice.actions

  export const selectPost = (state: RootState) => state.post.editedPost

export default postSlice.reducer;

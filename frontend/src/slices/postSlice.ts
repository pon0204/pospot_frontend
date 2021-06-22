import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { PostData,EditPost} from '../types/types'


export interface PostState {
  editedPost: EditPost
  // editedTag: Tag
}

const initialState: PostState = {
  editedPost: {
    title: '',
    caption: '',
    with: null,
    genre: null,
    eyecatch: null

}
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
  },
})

export const { setEditedPost, resetEditedPost} =
  postSlice.actions

  export const selectPost = (state: RootState) => state.post.editedPost

export default postSlice.reducer;

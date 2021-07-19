import { VFC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectQueryGenre, selectQueryPlace } from '../../../slices/postSlice';
import PostsItemNew from './PostsNewItem/PostsItemNew';
import PostsItemNewGenre from './PostsNewItem/PostsItemNewGenre';

const PostsNew:VFC = () => {
  const queryGenre = useAppSelector(selectQueryGenre)
  const queryPlace = useAppSelector(selectQueryPlace)

  return (
    <div>
      { queryPlace && queryGenre ?
      // <PostsAllNew/>
      <h2>どっちも</h2>
      : queryPlace ?
      <PostsItemNew/>
      : queryGenre ?
      <PostsItemNewGenre/>
      : <PostsItemNew/>
      }
    </div>
  )
}

export default PostsNew

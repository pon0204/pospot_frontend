import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { incrementQueryPage, selectPage } from '../../slices/postSlice';

  export const useQueryInfinitePostsFollow = (userId:string | null, genre:string | null,place:string | null) => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(selectPage)
    
    const getInfinitePostsFollow = async ({pageParam = 0}) => {

      const { data } = await axios.get(`${process.env.REACT_APP_REST_URL}/posts/follow/${userId}/${genre}/${place}/page/` + pageParam)
        // ジャンルを配列に変換
        data.posts.map((v:any) => v.genre = v.genre.split(','))
        dispatch(incrementQueryPage())    
        return data
    }
    
      return useInfiniteQuery('postsInfiniteFollow', getInfinitePostsFollow, 
      {
        getNextPageParam: (lastPage) =>
          lastPage.posts.length !== 0 ? page : false,
      }
      );
  }
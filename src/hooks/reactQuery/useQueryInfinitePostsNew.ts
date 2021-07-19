import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { incrementQueryPage, selectPage } from '../../slices/postSlice';

  export const useQueryInfinitePostsNew = (genre:string | null,place:string | null) => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(selectPage)
    
    const getInfinitePostsNew = async ({pageParam = 0}) => {

      const { data } = await axios.get(`${process.env.REACT_APP_REST_URL}/posts/New/${genre}/${place}/page/` + pageParam)
        // ジャンルを配列に変換
        data.posts.map((v:any) => v.genre = v.genre.split(','))
        dispatch(incrementQueryPage())    
        return data
    }
    
      return useInfiniteQuery('postsInfiniteNew', getInfinitePostsNew, 
      {
        getNextPageParam: (lastPage) =>
          lastPage.posts.length !== 0 ? page : false,
      }
      );
  }
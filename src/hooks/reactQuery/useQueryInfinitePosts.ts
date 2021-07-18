import axios from 'axios';
import { 
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
  useInfiniteQuery, 
  } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { incrementQueryPage, selectPage, setQueryGenre } from '../../slices/postSlice';

  export const useQueryInfinitePosts = () => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(selectPage)
    const getInfinitePosts = async ({pageParam = 0}) => {
      const { data } = await axios.get(`${process.env.REACT_APP_REST_URL}/posts/page/` + pageParam)
        // ジャンルを配列に変換
        data.posts.map((v:any) => v.genre = v.genre.split(','))
        dispatch(incrementQueryPage())    
        return data
    }
    
      return useInfiniteQuery('postsInfinite', getInfinitePosts, {
        getNextPageParam: (lastPage) =>
          lastPage.posts.length !== 0 ? page : false,
      });
  }

// import axios from 'axios';
// import { 
//   UseInfiniteQueryResult,
//   UseInfiniteQueryOptions,
//   useInfiniteQuery, 
//   } from 'react-query';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { selectPage, setQueryGenre } from '../../slices/postSlice';

//   const getInfinitePosts = async ({pageParam = 0}) => {
//     const { data } = await axios.get(`${process.env.REACT_APP_REST_URL}/posts/page/` + pageParam)
//       // ジャンルを配列に変換
//       data.posts.map((v:any) => v.genre = v.genre.split(','))
//       return data
//   }

//   const useInfiniteQueryPosts = 
//   (options?: UseInfiniteQueryOptions<any>): UseInfiniteQueryResult =>
//     useInfiniteQuery('postsInfinite', getInfinitePosts, {
//       ...options,
//       getPreviousPageParam: (firstPage) =>
//         firstPage.prevPageUrl ? true : false,
//       getNextPageParam: (lastPage) =>
//         lastPage.nextPageUrl ? page + 1 : false,
//     });

//     export default useInfiniteQueryPosts;
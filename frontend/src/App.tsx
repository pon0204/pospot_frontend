import React from 'react';
import './App.css';
import { VFC,useEffect} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Header from './components/Header'

import { useAppSelector,useAppDispatch } from "./app/hooks";
import { setHeaders } from "./slices/headersSlice";
import { useAuth0 } from "@auth0/auth0-react";

import Post from './components/posts/Post';
import PostShow from './components/posts/PostShow';
import PostForm from './components/posts/PostForm';
import Test from './components/test'
import ProfileNew from './components/profile/ProfileNew';
import ProfileShow from './components/profile/ProfileShow';
import { useMutateUser } from './hooks/useMutateUser';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: VFC = () => {
//   const dispatch = useAppDispatch()
//   const { getAccessTokenSilently,user }:any = useAuth0();
//   const { userIdMutation } = useMutateUser()
//   useEffect(() => {
//     const getToken = async () => {

//     try{
//       const accessToken = await getAccessTokenSilently({
//       });
//       dispatch(setHeaders(accessToken))
//       userIdMutation.mutate()
//     }
//     catch(e){
//       console.log(e.message)
//   } 
// }
//     getToken()

  
//   }, [])
  
  return (
    
    <div className='relative h-screen'>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Header/>
        <Switch>
          <Route exact path="/posts">
            {/* <MainTag/> */}
            <Post/>
          </Route>
          <Route exact path="/posts/new">
            {/* <MainTag/> */}
            <PostForm/>
          </Route>
          <Route
          exact path="/posts/:postId"
          render={({ match }:any) =>
          <PostShow
          match={match}
          />
          }
          />
          <Route
          exact path="/posts/edit/:postId"
          render={({ match }:any) =>
          <PostForm
          match={match}
          />
          }
          />
          <Route exact path="/profile/new">
            <ProfileNew/>
          </Route>
          <Route exact path="/profile/:profileId"
          render={({ match }:any) =>
          <ProfileShow
          match={match}
          />
          }
          />
          <Route exact path="/test">
            <Test/>
          </Route>
        </Switch>
        </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </div>

  );
}

export default App;

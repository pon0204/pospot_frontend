import React, { VFC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import PostForm from './components/posts/PostCreate';
import PostShow from './components/posts/PostShow';
import PostsIndex from './components/posts/PostsIndex';
import ProfileEdit from './components/profile/ProfileEdit';
import ProfileShow from './components/profile/ProfileShow';
import Test from './components/test';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: VFC = () => {
  return (
    
  <div className='relative h-screen'>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/posts">
            {/* <MainTag/> */}
            <PostsIndex/>
          </Route>
          <Route exact path="/posts/new">
            <PostForm/>
          </Route>
          <Route exact path="/profile/edit/:profileId"
          render={({ match }:any) =>
          <ProfileEdit
          match={match}
          />
          }
          />
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

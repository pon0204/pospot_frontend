import React, { VFC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import PostCreate from './components/posts/PostCreate'
import PostsIndex from './components/posts/PostsIndex'
import ProfileEdit from './components/profile/ProfileEdit'
import ProfileShow from './components/profile/ProfileShow'
import Top from './components/TopView/Top'

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
    <div className="relative h-screen">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className='h-14'/>
          <Switch>
            <Route exact path="/posts">
              {/* <MainTag/> */}
              <PostsIndex />
            </Route>
            <Route exact path="/posts/new">
              <PostCreate />
            </Route>
            <Route
              exact
              path="/profile/edit/:profileId"
              component ={ProfileEdit}
            />
            <Route
              exact
              path="/profile/:profileId"
              component = {ProfileShow} 
            />
            <Route exact path="/">
              <Top />
            </Route>
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App

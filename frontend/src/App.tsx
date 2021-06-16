import React from 'react';
import './App.css';
import { VFC,useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import UserInfo from './components/UserInfo';
import { useAppSelector,useAppDispatch } from "./app/hooks";
import { setToken } from "./slices/userToken";
import { useAuth0 } from "@auth0/auth0-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})




const App: VFC = () => {
  const dispatch = useAppDispatch()
  const { getAccessTokenSilently }:any = useAuth0();

  useEffect(() => {
    const getToken = async () => {

    try{
      const accessToken = await getAccessTokenSilently({
      });
      dispatch(setToken(accessToken))    
    }
    catch(e){
      console.log(e.message)
  } 
}
    getToken()
  }, [])
  
  return (
    
    <>
    <QueryClientProvider client={queryClient}>
    
    <LoginButton/>
    <br/>
    <LogoutButton/>
    <UserInfo/>
    {/* <Profile/> */}
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>

  );
}

export default App;

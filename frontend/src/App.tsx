import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import UserInfo from './components/UserInfo';


function App() {
  return (
    <>
    <LoginButton/>
    <br/>
    <LogoutButton/>
    <UserInfo/>
    <Profile/>
    </>
  );
}

export default App;

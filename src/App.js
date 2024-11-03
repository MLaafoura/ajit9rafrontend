import React from 'react';
import './App.css';
import Login from './containers/login';
import { ChakraProvider } from '@chakra-ui/react'
import { Route,Routes } from 'react-router-dom';
import Signup from './containers/signup';
import Dashboard from './pages/dashboard';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Activate from './containers/Activate';
import { Provider } from 'react-redux';
import store from './store';
import StudentAdd from './pages/StudentAdd';
import ListStudent from './pages/ListStudent';
import CommunicationPage from './pages/CommunicationPage';
import LeadsList from './pages/LeadsList';
import AnnouncementPage from './pages/AnnouncementPage';
import ProgramListPage from './pages/ProgramListPage';
import ProgramAddPage from './pages/ProgramAddPage';
import UsersPage from './pages/UsersListPage';
import LandingPage from './pages/LandingPage';
import ApplyPage from './pages/ApplyPage';


function App() {
  return (
   
    <ChakraProvider>
      <>
      <Provider store={store}>
      <Routes>
            <Route path="/" Component={LandingPage}/>
            <Route path='/dashboard' Component={Dashboard}/>
            <Route path='/signin' Component={Login}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/reset-password' Component={ResetPassword}/>
            <Route path='/password/reset/confirm/:uid/:token' Component={ResetPasswordConfirm}/>
            <Route path='/activate/:uid/:token' Component={Activate}/>
            <Route path='/student-add' Component={StudentAdd}/>
            <Route path='/student-list' Component={ListStudent}/>
            <Route path='/leads' Component={LeadsList}/>
            <Route path='/lead/:id' Component={CommunicationPage}/>
            <Route path='/announcements' Component={AnnouncementPage}/>
            <Route path='program-list' Component={ProgramListPage}/>
            <Route path='program-add' Component={ProgramAddPage}/>
            <Route path='/users' Component={UsersPage}/>
            <Route path='apply-now' Component={ApplyPage}/>

      </Routes>
      </Provider>
      </>
    </ChakraProvider>
    
  );
}

export default App;

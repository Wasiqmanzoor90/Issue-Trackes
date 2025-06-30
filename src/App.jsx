import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './page/landingPage';
import Navbar from './component/navbar';
import Footer from './component/footer';
import Dashboard from './page/dashboard';
import Login from './page/login';
import Register from './page/register';
import Create from './page/project/create';
import CreateIssue from './page/issue/create';
import AllProject from './page/project/allProject';
import AllIssue from './page/issue/allIssue';
import MyProject from './page/project/myProject';
import MyIssue from './page/issue/myIssue';
import Comment from './page/comments/comment';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/login' element={<Login/>}/>
        <Route path ='register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/project/create' element={<Create/>}/>
        <Route path='/issues/create' element={<CreateIssue/>}/>
        <Route path = '/project/allProject' element={<AllProject/>}/>
        <Route path='/issue/create' element={<CreateIssue/>}/>
        <Route path = 'issue/allIssue' element={<AllIssue/>}/>
        <Route path='/project/myProject' element={<MyProject/>}/>
        <Route path='issue/myIssue' element={<MyIssue/>} />
        <Route path='/issue/comment/:id' element={<Comment />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
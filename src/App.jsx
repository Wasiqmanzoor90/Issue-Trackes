import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './page/landingPage';
import Navbar from './component/navbar';
import Footer from './component/footer';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
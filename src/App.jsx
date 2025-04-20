import React from 'react';
import Header from './components/shared/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/shared/Footer';
import ScrollTop from './components/ScrollTop';

const App = () => {
  return (
    <div>
      <ScrollTop/>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default App;
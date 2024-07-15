import React from 'react';
import {Outlet} from "react-router-dom";

const Home = () => {
  console.log('home!');
  
  return (
      <>
        <Outlet />
      </>
  );
};

export default Home;
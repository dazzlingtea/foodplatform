import React from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router-config";
import { Reset } from "styled-reset";


const App = () => {
  
  return (
      <>
        <Reset />
        <RouterProvider router={router} />
        
      </>
  );
};

export default App;

import React from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router-config";


const App = () => {
  
  return (
    <RouterProvider router={router} />
  );
};

export default App;

import React from 'react';
import {Outlet} from "react-router-dom";
import ModalProvider from "../pages/common/ModalProvider";

const RootLayout = () => {
  return (
      <ModalProvider>
        <header>
          header
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          footer
        </footer>
      </ModalProvider>
  );
};

export default RootLayout;
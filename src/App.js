import React from 'react';
import App from 'app';
import AppProvider from 'contexts';
import { ToastContainer } from 'react-toastify';

const AppRender = () => {
  return (
    <AppProvider>
      <App />
      <ToastContainer />
    </AppProvider>
  );
};

export default AppRender;

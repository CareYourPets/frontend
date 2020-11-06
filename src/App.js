import React from 'react';
import AppProvider from 'contexts';
import { ToastContainer } from 'react-toastify';
import App from './app/App';

const AppRender = () => {
  return (
    <AppProvider>
      <App />
      <ToastContainer />
    </AppProvider>
  );
};

export default AppRender;

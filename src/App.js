import React from 'react';
import App from 'app';
import AppProvider from 'contexts';

const AppRender = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppRender;

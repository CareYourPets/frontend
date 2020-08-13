import React from 'react';
import { UserProvider } from './UserContext';

const AppProviders = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppProviders;

import React from 'react';

const defaultProps = {
  email: '',
  isAuth: false,
  isFetching: true
};

const defaultContextProps = {
  ...defaultProps,
  handleUser: Function.prototype()
};

const UserContext = React.createContext(defaultContextProps);

const UserProvider = props => {
  const [user, handleUser] = React.useState(defaultProps);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      handleUser({ ...user, isFetching: false });
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        handleUser
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

export { UserProvider, useUser };

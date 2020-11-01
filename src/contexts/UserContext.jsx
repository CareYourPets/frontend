import React from 'react';
import { checkAccessToken } from 'utils/auth.service';

const defaultProps = {
  email: '',
  role: '',
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

  const checkUserAuth = async () => {
    handleUser({ ...user, isFetching: true });
    try {
      const { email, role } = await checkAccessToken();
      handleUser({ email, role, isAuth: true, isFetching: false });
    } catch {
      handleUser({ ...user, isAuth: false, isFetching: false });
    }
  };

  React.useEffect(() => {
    checkUserAuth();
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

import React from 'react';
import Button from '@material-ui/core/Button';
import { useUser } from 'contexts/UserContext';

const Login = () => {
  const { user, handleUser } = useUser();
  return (
    <div>
      <div>This is the login page</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleUser({ ...user, isAuth: true })}
      >
        Login (Fake)
      </Button>
    </div>
  );
};

export default Login;

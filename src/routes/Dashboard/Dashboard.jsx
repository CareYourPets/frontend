import React from 'react';
import Button from '@material-ui/core/Button';
import { useUser } from 'contexts/UserContext';
import { logout } from 'utils/auth.service';

const Dashboard = () => {
  const { user, handleUser } = useUser();

  const onLogout = () => {
    logout();
    handleUser({ ...user, isAuth: false });
  };

  return (
    <div>
      <div>This is the dashboard page</div>
      <Button variant="contained" color="primary" onClick={() => onLogout()}>
        Logout (Fake)
      </Button>
    </div>
  );
};

export default Dashboard;

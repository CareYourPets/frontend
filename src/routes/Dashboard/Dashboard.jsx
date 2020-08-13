import React from 'react';
import Button from '@material-ui/core/Button';
import { useUser } from 'contexts/UserContext';

const Dashboard = () => {
  const { user, handleUser } = useUser();
  return (
    <div>
      <div>This is the dashboard page</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleUser({ ...user, isAuth: false })}
      >
        Logout (Fake)
      </Button>
    </div>
  );
};

export default Dashboard;

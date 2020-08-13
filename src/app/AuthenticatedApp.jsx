import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DASHBOARD } from 'constants/routes';
import Dashboard from 'routes/Dashboard';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={DASHBOARD} component={Dashboard} />
      <Redirect to={DASHBOARD} />
    </Switch>
  );
};

export default AuthenticatedApp;

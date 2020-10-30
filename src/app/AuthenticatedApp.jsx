import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DASHBOARD, PROFILE, BIDS } from 'constants/routes';
import Dashboard from 'routes/Dashboard';
import Profile from 'routes/Profile';
import Bid from 'routes/Bid';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={DASHBOARD} component={Dashboard} />
      <Route exact path={PROFILE} component={Profile} />
      <Route exact path={BIDS} component={Bid} />
      <Redirect to={DASHBOARD} />
    </Switch>
  );
};

export default AuthenticatedApp;

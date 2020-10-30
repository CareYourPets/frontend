import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DASHBOARD, PROFILE, BIDS, PETS, WORKING } from 'constants/routes';
import Dashboard from 'routes/Dashboard';
import Profile from 'routes/Profile';
import Bid from 'routes/Bid';
import Pet from 'routes/Pet';
import Working from 'routes/Working';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={DASHBOARD} component={Dashboard} />
      <Route exact path={PROFILE} component={Profile} />
      <Route exact path={BIDS} component={Bid} />
      <Route exact path={PETS} component={Pet} />
      <Route exact path={WORKING} component={Working} />
      <Redirect to={DASHBOARD} />
    </Switch>
  );
};

export default AuthenticatedApp;

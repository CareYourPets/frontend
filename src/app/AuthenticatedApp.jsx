import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  DASHBOARD,
  PROFILE,
  BIDS,
  PETS,
  WORKING,
  SEARCH,
  ROOT,
  CATEGORY
} from 'constants/routes';
import Dashboard from 'routes/Dashboard';
import Profile from 'routes/Profile';
import Bid from 'routes/Bid';
import Pet from 'routes/Pet';
import Working from 'routes/Working';
import Search from 'routes/Search';
import Category from 'routes/Category';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={DASHBOARD} component={Dashboard} />
      <Route exact path={PROFILE} component={Profile} />
      <Route exact path={BIDS} component={Bid} />
      <Route exact path={PETS} component={Pet} />
      <Route exact path={WORKING} component={Working} />
      <Route exact path={SEARCH} component={Search} />
      <Route exact path={CATEGORY} component={Category} />
      <Redirect to={ROOT} />
    </Switch>
  );
};

export default AuthenticatedApp;

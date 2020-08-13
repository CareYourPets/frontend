import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LOGIN, ROOT } from 'constants/routes';
import Login from 'routes/Login';

const UnAuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={LOGIN} component={Login} />
      <Route exact path={ROOT} component={Login} />
      <Redirect to={LOGIN} />
    </Switch>
  );
};

export default UnAuthenticatedApp;

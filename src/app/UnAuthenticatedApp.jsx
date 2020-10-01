import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LOGIN, ROOT, SIGN_UP } from 'constants/routes';
import Login from 'routes/Login';
import SignUp from 'routes/SignUp';

const UnAuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={LOGIN} component={Login} />
      <Route exact path={ROOT} component={Login} />
      <Route exact path={SIGN_UP} component={SignUp} />
      <Redirect to={LOGIN} />
    </Switch>
  );
};

export default UnAuthenticatedApp;

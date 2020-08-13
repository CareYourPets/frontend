import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppLoader from 'components/AppLoader';
import { useUser } from 'contexts/UserContext';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnAuthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp'));

const App = () => {
  const { user } = useUser();
  if (user.isFetching === true) {
    return <AppLoader />;
  }
  return (
    <React.Suspense fallback={<AppLoader />}>
      <Router>
        {user.isAuth ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </Router>
    </React.Suspense>
  );
};

export default App;

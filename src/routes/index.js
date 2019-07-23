import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from './history';
import PrivateRoute from './private';
import GuestRoute from './guest';

import Main from '~/pages/Main';
import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <GuestRoute path="/signin" component={SignIn} />
      <GuestRoute path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={Main} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;

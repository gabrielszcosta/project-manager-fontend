import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import ReactToastr from 'react-redux-toastr';

import Routes from './routes';
import store from './store';

import GlobalStyles from './styles/global';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <GlobalStyles />
      <ReactToastr />
      <Routes />
    </Fragment>
  </Provider>
);

export default App;

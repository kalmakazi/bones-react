import React from 'react';
import {Provider} from 'react-redux'
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import getStore from './store';

import App from './App';

const store = getStore({});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="*" component={App} />
    </Router>
  </Provider>,
  document.getElementById('mount')
);

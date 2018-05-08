import React from 'react';
import ReactDOM from 'react-dom';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';

import 'normalize.css';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App/App';
import './index.css';

const history = createHistory();

const rootReducer = combineReducers({
  router: routerReducer,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  undefined,
  /* eslint-disable function-paren-newline */
  composeEnhancers(
    applyMiddleware(
      // middleware for intercepting and dispatching navigation actions
      createLogger(),
      reduxThunk,
      routerMiddleware(history),
    ),
  ),
  /* eslint-enable */
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('📨'),
);

registerServiceWorker();

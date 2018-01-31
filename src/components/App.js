import React from 'react';
import { Route } from 'react-router-dom';
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

import Home from './Home/Home';
import './App.css';

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

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="App-container container-flex-center">
        <Route exact path="/" component={Home} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;

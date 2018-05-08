import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home/Home';
import './App.css';

const App = () => (
  <div className="App-container container-flex-center">
    <Route exact path="/" component={Home} />
  </div>
);

export default App;

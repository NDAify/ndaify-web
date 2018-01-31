import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('📨'));

registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import App from './containers/App/App';
// import registerServiceWorker from './registerServiceWorker';
//
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
//
// // src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import './index.css';
import './containers/Detail/Detail.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Routes from './routes';

ReactDOM.render(
    <Routes history={browserHistory} />,
    document.getElementById('root')
);
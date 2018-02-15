import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';
import App from 'components/App';

const store = configureStore();

const serverRender = () => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default serverRender;

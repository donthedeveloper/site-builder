import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App/App.react.jsx';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/' component={App} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

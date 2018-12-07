import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App/App.react.jsx";
import SignupForm from "./App/SignupForm";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/signup" component={SignupForm} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);

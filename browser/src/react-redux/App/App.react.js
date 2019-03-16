import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignupPage from './SignupPage/SignupPage.react';
import Nav from './Nav.react';
import LoginPage from './LoginPage/LoginPage.react';

export default () => (
  <div>
    <Nav />
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </div>
);

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignupPage from './SignupPage/SignupPage.react';
import Nav from './Nav.react';
import LoginPage from './LoginPage/LoginPage.react';
import ForgotPasswordPage from './ForgotPasswordPage/ForgotPasswordPage.react';

export default props => (
  <div>
    <Nav />
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
    </Switch>
  </div>
);

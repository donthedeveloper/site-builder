import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import SignupPage from './SignupPage';
import Nav from './Nav';
import Grid from './Grid';

export default props => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path='/signup' component={SignupPage} />
        <Route path='/grid' component={Grid} />
      </Switch>
    </div>
  );
};

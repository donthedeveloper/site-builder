import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import SignupPage from './SignupPage';
import Nav from './Nav';

export default props => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path='/signup' component={SignupPage} />
      </Switch>
    </div>
  );
};

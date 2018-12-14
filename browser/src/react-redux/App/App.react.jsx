import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import SignupPage from './SignupPage';

export default props => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
        </ul>
      </nav>

      <div>
        <Switch>
          <Route path='/signup' component={SignupPage} />
        </Switch>
      </div>

    </div>


  );
};

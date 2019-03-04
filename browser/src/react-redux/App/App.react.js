import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute.react'
import SignupPage from './SignupPage/SignupPage.react'
import Nav from './Nav.react'
import LoginPage from './LoginPage/LoginPage.react'

export default props => (
  <div>
    <Nav />
    <Switch>
      <PrivateRoute path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </div>
)

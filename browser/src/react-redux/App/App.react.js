import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignupPage from './SignupPage.react'
import Nav from './Nav.react'
import LoginPage from './LoginPage/LoginPage.react'

export default props => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </div>
  )
}

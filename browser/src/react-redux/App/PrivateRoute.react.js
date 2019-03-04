import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user === null ? <Component {...props} /> : <Redirect to="/" />
    }
  />
)

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)

import React from 'react'
import { connect } from 'react-redux'
import logInUser from './logInUser.action'
import axios from 'axios'

const initialState = {
  email: '',
  password: '',
  emailError: '',
  generalError: '',
  passwordError: ''
}

class LoginPage extends React.Component {
  state = initialState

  handleInputChange = event => {
    const { target, value } = event.target
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    e.preventDefault()
  }

  render() {
    return (
      <form className='login-form' onSubmit={this.handleSubmit}>
        <label htmlFor='email'>E-mail:</label>
        <input
          name='email'
          label='email'
          type='email'
          placeholder='email address'
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <label htmlFor='password'>Password:</label>
        <input
          name='password'
          label='password'
          type='password'
          required
          minLength={6}
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button disabled={!this.state.isValidated}>Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logInUser: user => {
      dispatch(logInUser(user))
    }
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

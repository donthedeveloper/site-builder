import React from 'react'
import { connect } from 'react-redux'
import {loginSuccess, loginFailure} from './updateUser.action'
import axios from 'axios'

const initialState = {
  email: '',
  password: '',
  generalError: ''
}

class LoginPage extends React.Component {
  state = initialState

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState(initialState)
    

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios
      .post('/api/auth/login', user)
      .then(res => {
        this.props.loginSuccess(user)
      })
      .catch(error => {
        this.props.loginFailure(user)
        const errorMsg = error.response.data.error.message
        this.setState({ generalError: errorMsg })
      })
  }
  componentDidUpdate() {
    if (this.props.user.loggedIn === true) {
      this.props.history.push('/')
    }
  }


  render() {
    return (
      <div>
        <form className='login-form' onSubmit={this.onSubmit}>
          <label htmlFor='email'>E-mail:</label>
          <input
            name='email'
            label='email'
            type='email'
            required
            placeholder='Email Address'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor='password'>Password:</label>
          <input
            name='password'
            label='password'
            placeholder='Enter Password'
            type='password'
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
        <span>{this.state.generalError}</span>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: user => {
      dispatch(loginSuccess(user))
    },
    loginFailure: user => {
      dispatch(loginFailure(user))
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

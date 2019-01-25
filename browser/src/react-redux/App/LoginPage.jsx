import React from 'react'
import { connect } from 'react-redux'
import logInUser from './logInUser.action'
import axios from 'axios'

const initialState = {
  email: '',
  password: '',
  emailError: '',
  generalError: '',
  passwordError: '',
  isLoggedIn: false
}

class LoginPage extends React.Component {
  state = initialState

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = e => {
    this.setState(initialState)

    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios
      .post('/api/auth/login', user)
      .then(res => {
        this.props.logInUser(res.data.user)
        //if login successfull reroute to home
        this.props.history.push('/')
      })
      .catch(error => {
        const errorMsg = error.response.data.error.message
        this.setState({ generalError: errorMsg })
      })
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
            minLength={4}
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        <span>{this.state.generalError}</span>
      </div>
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

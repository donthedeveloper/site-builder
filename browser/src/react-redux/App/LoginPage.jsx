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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getConfirmPasswordError = () => {
    return this.state.confirmPassword &&
      this.state.password !== this.state.confirmPassword
      ? 'Passwords do not match.'
      : null
  }

  isSubmitButtonEnabled = () => {
    return !(
      this.state.confirmPassword &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password === this.state.confirmPassword
    )
  }

  onSubmit = e => {
    this.setState(initialState)

    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios
      .post('/api/user', user)
      .then(res => {
        //set current user with redux store.
        this.props.setUser(res.data.user)
      })
      .catch(err => {
        if (err.response.data.error.errors) {
          const errors = err.response.data.error.errors

          errors.email
            ? this.setState({ emailError: errors.email.message })
            : null
          errors.password
            ? this.setState({ passwordError: errors.password.message })
            : null
        } else {
          this.setState({
            generalError: err.response.data.error.message
          })
        }
      })
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <form className='login-form' onSubmit={this.OnSubmit}>
        <label htmlFor='email'>E-mail:</label>
        <input
          name='email'
          label='email'
          type='email'
          placeholder='email address'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor='password'>Password:</label>
        <input
          name='password'
          label='password'
          type='password'
          required
          minLength={6}
          value={this.state.password}
          onChange={this.handleChange}
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

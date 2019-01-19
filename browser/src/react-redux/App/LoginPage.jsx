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
        if (res.status === 200) {
          //how to make log in persist?
          this.setState({ isLoggedIn: true })
          console.log('login')
        } else {
          console.log('nice try buddy')
        }
      })
      .catch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
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
          minLength={6}
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button>Submit</button>
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

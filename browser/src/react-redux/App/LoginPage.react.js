import React, { Component } from 'react'
import { connect } from 'react-redux'
import setUser from './User/User.action'
import axios from 'axios'

const initialState = {
  email: '',
  password: '',
  error: ''
}

class LoginPage extends Component {
  state = initialState

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isSubmitButtonEnabled = () => {
    return !(
      this.state.email &&
      this.state.password
    )
  }

  onSubmit = e => {
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    axios
      .post('/api/auth/login', user)
      .then(res => {
        this.props.setUser(res.data);
      })
      .catch(error => {
        const err = error.response.data.error.message
        this.setState({ error: err })
      })
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.history.push('/')
    }
  }
  render() {
    return (
      <div className='login-page'>
        <form onSubmit={this.onSubmit} className='login-page__form'>
          <h1 className='login-page__title'>Login</h1>
          <p className='login-page__general-error'>
            {this.state.error}
          </p>

          <div className='login-page__input'>
            <label className='login-page__label'>
              Email
            </label>
            <input
              name='email'
              value={this.state.email}
              type='email'
              onChange={this.handleChange}
              className='login-page__input-field'
            />
          </div>

          <div className='login-page__input'>
            <label className='login-page__label'>
              Password
            </label>
            <input
              name='password'
              value={this.state.password}
              type='password'
              onChange={this.handleChange}
              className='login-page__input-field'
            />
          </div>

          <div>
            <button
              disabled={this.isSubmitButtonEnabled()}
              className='login-page__submit-button'
              type="submit"
            >
              Login!
          </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user))
    }
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
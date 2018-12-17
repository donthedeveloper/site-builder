import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import setUser from './setUser.action'
import axios from 'axios';

const initialState = {
  confirmPassword: '',
  email: '',
  password: '',
  emailError: '',
  generalError: '',
  passwordError: ''
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user))
    }
  }
}

class SignupPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired
  };

  state = initialState

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getConfirmPasswordError = () => {
    return (this.state.confirmPassword && this.state.password !== this.state.confirmPassword)
      ? 'Passwords do not match.'
      : null;
  }

  enableButton = () => {
    return (
      this.state.confirmPassword &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password === this.state.confirmPassword
    )
      ? false
      : true;
  }

  onSubmit = (e) => {
    this.setState(initialState);

    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/api/user', user)
      .then(res => {
        if (res.request.status === 201) {
          //set current user with redux store.
          this.props.setUser({ email: user.email });
          this.props.history.push('/')
        }
      })
      .catch(err => {
        if (err.response.data.error.errors) {
          const errors = err.response.data.error.errors;

          errors.email ? this.setState({ emailError: errors.email.message }) : null
          errors.password ? this.setState({ passwordError: errors.password.message }) : null

        } else {
          this.setState({
            generalError: err.response.data.error.message
          });
        }
      });
  }

  render() {
    return (
      <div className='signup-page'>
        <form onSubmit={this.onSubmit} className='signup-page__form'>
          <h1 className='signup-page__title'>Signup for Site Builder</h1>
          <p className='signup-page__general-error'>
            {this.state.generalError}
          </p>

          <div className='input'>
            <label className='input__label'>
              Email
              <span className='input__error'>{this.state.emailError}</span>
            </label>
            <input
              name='email'
              value={this.state.email}
              type='email'
              onChange={this.handleChange}
              className='input__input-field'
            />
          </div>

          <div className='input'>
            <label className='input__label'>
              Password
              <span className='input__error'>{this.state.passwordError}</span>
            </label>
            <input
              name='password'
              value={this.state.password}
              type='password'
              onChange={this.handleChange}
              className='input__input-field'
            />
          </div>

          <div className='input'>
            <label className='input__label'>
              Confirm Password
              <span className='input__error'>{this.getConfirmPasswordError()}</span>
            </label>
            <input
              name='confirmPassword'
              value={this.state.confirmPassword}
              type='password'
              onChange={this.handleChange}
              className='input__input-field'
            />
          </div>

          <div>
            <button
              disabled={this.enableButton()}
              className='signup-page__submit-button'
            >
              Signup!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignupPage));

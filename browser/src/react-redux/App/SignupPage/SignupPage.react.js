import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import setUser from '../User/User.actions';

const initialState = {
  confirmPassword: '',
  email: '',
  password: '',
  emailError: '',
  generalError: '',
  passwordError: ''
};

class SignupPage extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      __v: PropTypes.number
    })
  };

  state = initialState;

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getConfirmPasswordError = () => {
    return this.state.confirmPassword &&
      this.state.password !== this.state.confirmPassword
      ? 'Passwords do not match.'
      : null;
  };

  isSubmitButtonEnabled = () => {
    return !(
      this.state.confirmPassword &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password === this.state.confirmPassword
    );
  };

  isSubmitButtonDisabled = () =>
    !(
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password === this.state.confirmPassword
    );

  onSubmit = e => {
    e.preventDefault();
    const { emailError, passwordError, generalError } = this.state;

    if (emailError || passwordError || generalError) {
      this.setState({
        emailError: '',
        passwordError: '',
        generalError: ''
      });
    }
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('/api/user', user)
      .then(res => {
        // set current user with redux store.
        this.props.setUser(res.data.user);
      })
      .catch(err => {
        if (err.response.data.error.errors) {
          const errors = err.response.data.error.errors;

          errors.email
            ? this.setState({ emailError: errors.email.message })
            : null;
          errors.password
            ? this.setState({ passwordError: errors.password.message })
            : null;
        } else {
          this.setState({
            generalError: err.response.data.error.message
          });
        }
      });
  };

  render() {
    const { user } = this.props;
    if (user) {
      return <Redirect to='/' />;
    }
    return (
      <div className='signup-page'>
        <form onSubmit={this.onSubmit} className='signup-page__form'>
          <h1 className='signup-page__title'>Signup for Site Builder</h1>
          <p className='signup-page__general-error'>
            {this.state.generalError}
          </p>

          <div className='signup-page__input'>
            <label className='signup-page__label'>
              Email
              <span className='signup-page__error'>
                {this.state.emailError}
              </span>
            </label>
            <input
              name='email'
              value={this.state.email}
              type='email'
              onChange={this.handleChange}
              className='signup-page__input-field'
              required
            />
          </div>

          <div className='signup-page__input'>
            <label className='signup-page__label'>
              Password
              <span className='signup-page__error'>
                {this.state.passwordError}
              </span>
            </label>
            <input
              name='password'
              value={this.state.password}
              type='password'
              onChange={this.handleChange}
              className='signup-page__input-field'
              required
            />
          </div>

          <div className='signup-page__input'>
            <label className='signup-page__label'>
              Confirm Password
              <span className='signup-page__error'>
                {this.getConfirmPasswordError()}
              </span>
            </label>
            <input
              name='confirmPassword'
              value={this.state.confirmPassword}
              type='password'
              onChange={this.handleChange}
              className='signup-page__input-field'
              required
            />
          </div>

          <div>
            <button
              disabled={this.isSubmitButtonEnabled()}
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

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

const mapStateToProps = state => ({ user: state.user });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setUserAction } from '../User/User.actions';

const initialState = {
  confirmPassword: '',
  email: '',
  password: '',
  emailError: '',
  generalError: '',
  passwordError: '',
};

class SignupPage extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      __v: PropTypes.number,
    }),
  }

  static defaultProps = { user: null };

  state = initialState

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  getConfirmPasswordError = () => {
    const { confirmPassword, password } = this.state;

    return confirmPassword && password !== confirmPassword
      ? 'Passwords do not match.'
      : null;
  }


  isSubmitButtonEnabled = () => {
    const { confirmPassword, password } = this.state;
    return !(confirmPassword
      && password
      && confirmPassword
      && password === confirmPassword);
  }

  isSubmitButtonDisabled = () => {
    const { confirmPassword, email, password } = this.state;
    return !(email
      && password
      && confirmPassword
      && password === confirmPassword);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      email, password, emailError, passwordError, generalError,
    } = this.state;

    if (emailError || passwordError || generalError) {
      this.setState({
        emailError: '',
        passwordError: '',
        generalError: '',
      });
    }
    const user = {
      email,
      password,
    };

    axios
      .post('/api/user', user)
      .then((res) => {
        const { setUser } = this.props;
        // set current user with redux store.
        setUser(res.data.user);
      })
      .catch((err) => {
        if (err.response.data.error.errors) {
          const { errors } = err.response.data.error;

          return this.setState({
            emailError: errors.email ? errors.email.message : '',
            passwordError: errors.password ? errors.password.message : '',
          });
        }
        return this.setState({
          generalError: err.response.data.error.message,
        });
      });
  }

  render() {
    const { user } = this.props;
    const {
      generalError, emailError, email, passwordError, password, confirmPassword,
    } = this.state;
    if (user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="signup-page">
        <form onSubmit={this.onSubmit} className="signup-page__form">
          <h1 className="signup-page__title">Signup for Site Builder</h1>
          <p className="signup-page__general-error">
            {generalError}
          </p>

          <div className="signup-page__input">
            <label htmlFor="email" className="signup-page__label">
              Email
              <span className="signup-page__error">
                {emailError}
              </span>
              <input
                name="email"
                value={email}
                type="email"
                onChange={this.handleChange}
                className="signup-page__input-field"
                required
              />
            </label>

          </div>

          <div className="signup-page__input">
            <label htmlFor="password" className="signup-page__label">
              Password
              <span className="signup-page__error">
                {passwordError}
              </span>
              <input
                name="password"
                value={password}
                type="password"
                onChange={this.handleChange}
                className="signup-page__input-field"
                required
              />
            </label>

          </div>

          <div className="signup-page__input">
            <label htmlFor="confirmPassword" className="signup-page__label">
              Confirm Password
              <span className="signup-page__error">
                {this.getConfirmPasswordError()}
              </span>
              <input
                name="confirmPassword"
                value={confirmPassword}
                type="password"
                onChange={this.handleChange}
                className="signup-page__input-field"
                required
              />
            </label>

          </div>

          <div>
            <button
              type="submit"
              disabled={this.isSubmitButtonEnabled()}
              className="signup-page__submit-button"
            >
              Signup!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    dispatch(setUserAction(user));
  },
});

const mapStateToProps = state => ({ user: state.user });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
<<<<<<< HEAD
import { setUserAction } from '../User/User.actions';
=======
import setUser from '../User/User.actions';
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd

const initialState = {
  confirmPassword: '',
  email: '',
  password: '',
  emailError: '',
  generalError: '',
<<<<<<< HEAD
  passwordError: '',
=======
  passwordError: ''
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
};

class SignupPage extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
<<<<<<< HEAD
      __v: PropTypes.number,
    }),
  }

  static defaultProps = { user: null };

  state = initialState
=======
      __v: PropTypes.number
    })
  };

  state = initialState;
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd

  handleChange = (event) => {
    this.setState({
<<<<<<< HEAD
      [event.target.name]: event.target.value,
    });
  }
=======
      [event.target.name]: event.target.value
    });
  };
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd

  getConfirmPasswordError = () => {
    const { confirmPassword, password } = this.state;

    return confirmPassword && password !== confirmPassword
      ? 'Passwords do not match.'
      : null;
<<<<<<< HEAD
  }
=======
  };
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd


  isSubmitButtonEnabled = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd

    if (emailError || passwordError || generalError) {
      this.setState({
        emailError: '',
        passwordError: '',
<<<<<<< HEAD
        generalError: '',
      });
    }
    const user = {
      email,
      password,
=======
        generalError: ''
      });
    }
    const user = {
      email: this.state.email,
      password: this.state.password
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
    };

    axios
      .post('/api/user', user)
      .then((res) => {
        const { setUser } = this.props;
        // set current user with redux store.
<<<<<<< HEAD
        setUser(res.data.user);
=======
        this.props.setUser(res.data.user);
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
      })
      .catch((err) => {
        if (err.response.data.error.errors) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
          </p>

          <div className='signup-page__input'>
            <label className='signup-page__label'>
              Email
<<<<<<< HEAD
              <span className="signup-page__error">
                {emailError}
=======
              <span className='signup-page__error'>
                {this.state.emailError}
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
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
<<<<<<< HEAD

=======
            <input
              name='email'
              value={this.state.email}
              type='email'
              onChange={this.handleChange}
              className='signup-page__input-field'
              required
            />
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
          </div>

          <div className='signup-page__input'>
            <label className='signup-page__label'>
              Password
<<<<<<< HEAD
              <span className="signup-page__error">
                {passwordError}
=======
              <span className='signup-page__error'>
                {this.state.passwordError}
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
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
<<<<<<< HEAD

=======
            <input
              name='password'
              value={this.state.password}
              type='password'
              onChange={this.handleChange}
              className='signup-page__input-field'
              required
            />
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
          </div>

          <div className='signup-page__input'>
            <label className='signup-page__label'>
              Confirm Password
              <span className='signup-page__error'>
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
<<<<<<< HEAD

=======
            <input
              name='confirmPassword'
              value={this.state.confirmPassword}
              type='password'
              onChange={this.handleChange}
              className='signup-page__input-field'
              required
            />
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
          </div>

          <div>
            <button
              type="submit"
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

<<<<<<< HEAD
const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    dispatch(setUserAction(user));
  },
});
=======
const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd

const mapStateToProps = state => ({ user: state.user });

export default connect(
  mapStateToProps,
<<<<<<< HEAD
  mapDispatchToProps,
=======
  mapDispatchToProps
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
)(SignupPage);

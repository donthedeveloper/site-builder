import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import setUserAction from '../User/User.actions';

const initialState = {
  email: '',
  password: '',
  error: '',
};

class LoginPage extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      __v: PropTypes.number,
    }),
  };

  static defaultProps = {
    user: null,
  }

  state = initialState

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  isSubmitButtonDisabled = () => {
    const { email, password } = this.state;
    return !(
      email && password
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    axios
      .post('/api/auth/login', user)
      .then((res) => {
        const { setUser } = this.props;
        setUser(res.data);
      })
      .catch((error) => {
        const err = error.response.data.error.message;
        this.setState({ error: err });
      });
  }

  render() {
    const { error, email, password } = this.state;
    const { user } = this.props;
    if (user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-page">
        <form onSubmit={this.onSubmit} className="login-page__form">
          <h1 className="login-page__title">Login</h1>
          <p className="login-page__general-error">
            {error}
          </p>

          <div className="login-page__input">
            <label htmlFor="email" className="login-page__label">
              Email
              <input
                id="email"
                name="email"
                value={email}
                type="email"
                onChange={this.handleChange}
                className="login-page__input-field"
                required
              />
            </label>
          </div>

          <div className="login-page__input">
            <label htmlFor="password" className="login-page__label">
              Password
              <input
                id="password"
                name="password"
                value={password}
                type="password"
                onChange={this.handleChange}
                className="login-page__input-field"
                required
              />
            </label>
          </div>

          <div>
            <button
              disabled={this.isSubmitButtonDisabled()}
              className="login-page__submit-button"
              type="submit"
            >
              Login!
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

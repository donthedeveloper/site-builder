import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  email: '',
  errorMessage: '',
  successMessage: '',
};

class ForgotPasswordPage extends Component {
  state = initialState;

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '', successMessage: '' });
    const { email } = this.state;
    const userEmail = {
      email,
    };
    axios
      .post('/api/auth/forgot', userEmail)
      .then(() => {
        this.setState({ successMessage: 'You should receive an email, soon, with instructions to reset your password.' });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.error.message });
      });
  }

  render() {
    const { email, errorMessage, successMessage } = this.state;
    const selectedMessage = errorMessage || successMessage;
    return (
      <div className="forgot-page">
        <p>{selectedMessage}</p>
        <form
          onSubmit={this.onSubmit}
          className="forgot-page__form"
        >
          <h1 className="forgot-page__title">Forgot Password</h1>
          <div className="forgot-page__input">
            <label htmlFor="email" className="forgot-page__label">
              Email
              <input
                id="email"
                name="email"
                value={email}
                type="email"
                onChange={this.handleChange}
                className="forgot-page__input-field"
                required
              />
            </label>
          </div>
          <div>
            <button
              className="forgot-page__submit-button"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordPage;

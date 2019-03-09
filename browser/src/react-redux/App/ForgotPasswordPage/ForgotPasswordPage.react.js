import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  email: '',
  response: '',
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
    this.setState({ response: '' });
    const { email } = this.state;
    const userEmail = {
      email,
    };
    axios
      .post('/api/auth/forgot', userEmail)
      .then(() => {
        this.setState({ response: 'You should receive an email, soon, with instructions to reset your password.' });
      })
      .catch((error) => {
        const { message } = error.response.data;
        this.setState({ response: message });
      });
  }

  render() {
    const { email, response } = this.state;
    return (
      <div className="forgot-page">
        <form onSubmit={this.onSubmit} className="forgot-page__form">
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
              // disabled={this.isSubmitButtonDisabled()}
              className="forgot-page__submit-button"
              type="submit"
            >
              Submit
            </button>
          </div>
          <p>{response}</p>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordPage;

import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";

class signupForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        confirmPassword: ""
      },
      buttonDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(key, e) {
    this.setState({
      [key]: e
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post("/api/user", { user }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //check if password and confirmPassword fields match. If not, set error message to state.

    if (
      this.state.confirmPassword &&
      this.state.password != this.state.confirmPassword &&
      !this.state.errors.confirmPassword
    ) {
      this.setState({ errors: { confirmPassword: "Passwords do not match." } });
    } else if (prevState.errors.confirmPassword) {
      this.setState({
        errors: {
          confirmPassword: ""
        }
      });
    }
    //disable submit until following requirements are met
    if (
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password === this.state.confirmPassword &&
      prevState.buttonDisabled
    ) {
      this.setState({
        buttonDisabled: false
      });
    } else if (
      this.state.password !== this.state.confirmPassword &&
      prevState.buttonDisabled == false
    ) {
      this.setState({
        buttonDisabled: true
      });
    }
  }
  render() {
    let name = Object.keys(this.state);
    return (
      <div className="signup-form">
        <form onSubmit={this.onSubmit} className="signup-form__form-group">
          <h1 className="signup-form__title">Signup for Site Builder</h1>
          <Form
            label="Email"
            name={name[0]}
            value={this.state[0]}
            handleChange={this.handleChange}
            type="email"
          />
          <Form
            label="Password"
            name={name[1]}
            value={this.state[1]}
            handleChange={this.handleChange}
            type="password"
          />
          <Form
            label="Confirm Password"
            name={name[2]}
            value={this.state[2]}
            handleChange={this.handleChange}
            error={this.state.errors.confirmPassword}
            type="password"
          />
          <div>
            <button
              disabled={this.state.buttonDisabled}
              className="signup-form__submit-button"
            >
              Signup!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default signupForm;

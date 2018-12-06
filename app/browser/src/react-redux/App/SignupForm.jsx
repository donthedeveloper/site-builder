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
      confirmPasswordError: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, e) {
    this.setState({
      [key]: e
    });
  }
  //check if password and confirmPassword fields match. If not, set error message to state.
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.confirmPassword != this.state.confirmPassword &&
      this.state.confirmPassword.length > 0 &&
      this.state.password != this.state.confirmPassword
    ) {
      this.setState({ confirmPasswordError: "Passwords do not match." });
    } else if (
      prevState.confirmPassword !== this.state.confirmPassword &&
      (this.state.confirmPassword === this.state.password ||
        this.state.confirmPassword.length === 0)
    ) {
      this.setState({
        confirmPasswordError: ""
      });
    }
  }
  render() {
    let name = Object.keys(this.state);
    let mismatch = "Passwords do not match.";
    return (
      <div className="signup-form">
        <form action="" className="signup-form__form-group">
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
            error={this.state.error}
            type="password"
          />
          <div>
            <button className="signup-form__submit-button">Signup!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default signupForm;

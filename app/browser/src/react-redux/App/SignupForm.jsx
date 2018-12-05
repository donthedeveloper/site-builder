import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";

class signupForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, e) {
    this.setState({
      [key]: e
    });
  }
  render() {
    let inputs = Object.keys(this.state);
    return (
      <div className="signup-form">
        <form action="" className="signup-form__form-group">
          <h1 className="signup-form__title">Signup for Site Builder</h1>
          {inputs.map(input => (
            <Form
              label={input}
              value={this.state[input]}
              handleChange={this.handleChange}
              key={input}
            />
          ))}
          <div>
            <button className="signup-form__submit-button">Signup!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default signupForm;

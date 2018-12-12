import React from 'react'
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValidated: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    //validation checks
    if (name === 'email') {
      console.log('the email is being checked...')
    } else {
      console.log('the password is being checked....')
    }
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <form className='login-form' onSubmit={this.handleSubmit}>
        <div>{this.state.emailError}</div>
        <label htmlFor='email'>E-mail:</label>
        <input
          name='email'
          label='email'
          type='email'
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <div>{this.state.passwordError}</div>
        <label htmlFor='password'>Password:</label>
        <input
          name='password'
          label='password'
          type='password'
          minLength={5}
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button disabled={!this.state.isValidated}>Submit</button>
      </form>
    )
  }
}

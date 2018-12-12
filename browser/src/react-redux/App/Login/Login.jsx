import React from 'react'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValidated: false,
      validEmail: false,
      validPassword: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.displayErrors = this.displayErrors.bind(this)
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
      this.validateEmail(value)
        ? this.setState({ validEmail: true })
        : this.setState({ validEmail: false })
    } else {
      this.validatePassword(value)
        ? this.setState({ validPassword: true })
        : this.setState({ validPassword: false })
    }
    //check if both email and password are valid
    this.state.validEmail && this.state.validPassword
      ? this.setState({ isValidated: true })
      : this.setState({ isValidated: false })
  }

  validateEmail(value) {
    //insert email validation logic here
    return value.length >= 3 ? true : false
  }
  validatePassword(value) {
    //insert password validation logic here
    return value.length >= 6 ? true : false
  }

  displayErrors() {
    //incoming massive if/else monster.
    if (!this.state.validEmail && !this.state.validPassword) {
      this.setState({ emailError: 'Please enter a valid e-mail:' })
      this.setState({ passwordError: 'Please enter a valid password:' })
    } else if (!this.state.validPassword && this.state.validEmail) {
      this.setState({ passwordError: 'Please enter a valid password:' })
      this.setState({ emailError: '' })
    } else if (!this.state.validEmail && this.state.validPassword) {
      this.setState({ emailError: 'Please enter a valid e-mail:' })
      this.setState({ passwordError: '' })
    } else {
      this.setState({ emailError: '', passwordError: '' })
    }
  }

  handleSubmit(e) {
    this.displayErrors()
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
          minLength={6}
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button
          onMouseEnter={this.displayErrors}
          disabled={!this.state.isValidated}>
          Submit
        </button>
      </form>
    )
  }
}

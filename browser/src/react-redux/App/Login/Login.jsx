import React from 'react'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
  }

  handleInputChange = event => {
    const { target, value } = event.target
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    console.log('submitted')
    e.preventDefault()
  }

  render() {
    return (
      <form className='login-form' onSubmit={this.handleSubmit}>
        <label htmlFor='email'>E-mail:</label>
        <input
          name='email'
          label='email'
          type='email'
          placeholder='email address'
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <label htmlFor='password'>Password:</label>
        <input
          name='password'
          label='password'
          type='password'
          required
          minLength={6}
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button disabled={!this.state.isValidated}>Submit</button>
      </form>
    )
  }
}

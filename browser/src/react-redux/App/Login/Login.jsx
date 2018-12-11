import React from 'react'
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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
  }
  handleSubmit(e) {
    console.log('submitted', this.state.email, this.state.password)
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
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <label htmlFor='password'>Password:</label>
        <input
          name='password'
          label='password'
          type='password'
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button>Submit</button>
      </form>
    )
  }
}

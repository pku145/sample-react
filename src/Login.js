import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin (event) {
    event.preventDefault()
    this.props.onLogin(this.usernameInput.value, this.passwordInput.value)
    this.usernameInput.value = ''
    this.passwordInput.value = ''
  }

  render () {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <form onSubmit={this.onLogin}>
            <input placeholder='User Name' ref={usernameInput => (this.usernameInput = usernameInput)} />
            <input placeholder='Password' ref={passwordInput => (this.passwordInput = passwordInput)} />
            <button>OK</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login

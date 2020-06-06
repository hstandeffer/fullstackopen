import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()

    handleLogin({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={loginUser}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          value={username}
          type="text"
          name="username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          value={password}
          type="password"
          name="password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="submitLogin" type="submit">Submit</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
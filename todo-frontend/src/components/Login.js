import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ email, setEmail, setToken }) => {
  const [password, setPassword] = useState('')
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const navigate = useNavigate()
  const serverAddr = 'http://127.0.0.1:8000'
  const getYear = () => {
    const today = new Date()
    return today.getFullYear()
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${serverAddr}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      // Successful Login
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setEmail(data.email)
        setToken(data)
        setInvalidCredentials(true)
        navigate('/home')
      } else {
        console.log(data)
        setInvalidCredentials(false)
      }
    } catch (error) {
      console.log('Error while Login: ', error.message)
    }
  }
  return (
    <div className="login">
      <div className="login-header">Terabh Intelligence</div>
      <div className="login-title-container">
        <div className="login-title">Todo</div>
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <form onSubmit={(e) => handleLoginSubmit(e)}>
            <label htmlFor="login-email">email:</label>
            <input
              type="text"
              value={email}
              id="login-email"
              name="login-email"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setEmail(e.target.value)
                setInvalidCredentials(false)
              }}
            />
            <br />
            <label htmlFor="login-password">password:</label>
            <input
              type="password"
              value={password}
              id="login-password"
              name="login-password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value)
                setInvalidCredentials(false)
              }}
            />
            <br />
            <p
              className="errorLabel"
              style={{ display: invalidCredentials ? 'block' : 'none' }}
            >
              Invalid Credentials
            </p>
          </form>
          <div className="login-button-container">
            <button type="submit" className="login-button">
              login
            </button>
          </div>
          <div className="signup-instead">
            new user?
            <a href="/signup">sign up</a>
          </div>
        </div>
      </div>
      <div className="login-footer">
        Terabh Intelligence-Copyright &copy; {getYear()}
      </div>
    </div>
  )
}

export default Login

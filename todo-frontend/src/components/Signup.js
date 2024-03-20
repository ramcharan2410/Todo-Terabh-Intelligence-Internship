import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({
  userName,
  setUserName,
  email,
  setEmail,
  setToken,
}) => {
  const [userExists, setUserExists] = useState(false)
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
  const navigate = useNavigate()
  const serverAddr = 'http://127.0.0.1:8000'
  const getYear = () => {
    const today = new Date()
    return today.getFullYear()
  }
  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    if (email.length === 0) {
      setEmailError('Enter a valid email')
      return
    }
    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    try {
      const response = await fetch(`${serverAddr}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      // Successful Signup
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setToken(data)
        navigate('/home')
      } else {
        console.log(data)
        setToken(data)
      }
    } catch (error) {
      console.log('Error while Login: ', error.message)
    }
  }
  return (
    <div className="signup">
      <div className="signup-header">Something</div>
      <div className="title">Todo</div>
      <div className="signup-form">
        <form onSubmit={(e) => handleSignupSubmit(e)}>
          <label htmlFor="signup-email">Email:</label>
          <input
            type="text"
            value={email}
            id="signup-email"
            name="signup-email"
            placeholder="Enter your email"
            required
            onChange={(e) => {
              setEmail(e.target.value)
              if (!emailRegex.test(e.target.value)) {
                setEmailError('Enter a valid email')
              } else {
                setEmailError('')
              }
              setUserExists(false)
            }}
          />
          <label
            className="errorLabel"
            style={{
              display: emailError ? 'block' : 'none',
            }}
          >
            {emailError}
          </label>
          <br />
          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            value={password}
            id="signup-password"
            name="signup-password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value)
              if (e.target.value.length === 0) {
                setPasswordError('Please enter a password')
              } else if (e.target.value.length < 8) {
                setPasswordError('The password must be 8 characters or longer')
              } else {
                setPasswordError('')
              }
            }}
          />
          <label
            className="errorLabel"
            style={{
              display: passwordError ? 'block' : 'none',
            }}
          >
            {passwordError}
          </label>
          <br />
          <button type="submit" className="signup-button">
            Signup
          </button>
          <br/>
          <label
            className="errorLabel"
            style={{
              display: userExists ? 'block' : 'none',
            }}
          >
            User already registered
          </label>
          <div className="login-instead">
            Already an existing user?
            <a href="/login">Login</a>
          </div>
        </form>
      </div>
      <div className="signup-footer">
        Terabh Intelligence-Copyright &copy; {getYear()}
      </div>
    </div>
  )
}

export default Signup

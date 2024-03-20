import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({
  userName,
  setUserName,
  email,
  setEmail,
  setIsAuthenticated,
}) => {
  const [userNameExists, setUserNameExists] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
  const navigate = useNavigate()
  return <div className="signup"></div>
}

export default Signup

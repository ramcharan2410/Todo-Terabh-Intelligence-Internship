import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ userName, setUserName, setEmail, setIsAuthenticated }) => {
  const [password, setPassword] = useState('')
  const [userNotFound, setUserNotFound] = useState(false)
  const [wrongUserName, setWrongUserName] = useState('')
  const [invalidPassword, setInvalidPassword] = useState(false)
  const navigate = useNavigate()
  return <div className="login"></div>
}

export default Login

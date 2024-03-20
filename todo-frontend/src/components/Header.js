import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({ email }) => {
  const navigate = useNavigate()
  const serverAddr = 'http://127.0.0.1:8000'
  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${serverAddr}/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Successful Signout
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        navigate('/login')
      }
    } catch (error) {
      console.log('Error while Login: ', error.message)
    }
  }
  return (
    <div className="home-header">
      <div className="userName" title={email}>
        {email}'s Tasks
      </div>
      <button className="logout" onClick={(e) => handleSignOut(e)}>
        Logout
      </button>
    </div>
  )
}

export default Header

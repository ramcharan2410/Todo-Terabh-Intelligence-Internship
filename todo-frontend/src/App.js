import { useState } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Home from './components/Home.js'
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import ProtectedRoutes from './ProtectedRoutes'
import './App.css'
const App = () => {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <Signup
                email={email}
                setEmail={setEmail}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                setToken={setToken}
              />
            }
          />
          <Route
            element={<ProtectedRoutes token={token} />}
          >
            <Route exact path="/home" element={<Home email={email} token={token} />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

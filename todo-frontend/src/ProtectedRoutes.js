import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes

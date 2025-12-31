import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserTokenContext } from '../context/UserToken'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserTokenContext)

  if (!token) {
    return <Navigate to="/login" replace={true} />
  }

  return children
}

export default ProtectedRoute

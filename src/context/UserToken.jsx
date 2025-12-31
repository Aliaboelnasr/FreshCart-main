import { createContext, useState, useEffect } from 'react'

export const UserTokenContext = createContext()

export function UserTokenProvider({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
      setToken(newToken)
    } else {
      localStorage.removeItem('token')
      setToken(null)
    }
  }

  return (
    <UserTokenContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </UserTokenContext.Provider>
  )
}

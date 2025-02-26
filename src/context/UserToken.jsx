import { createContext, useState } from 'react'

export const UserTokenContext = createContext()

export function UserTokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <UserTokenContext.Provider value={{ token, setToken }}>
      {children}
    </UserTokenContext.Provider>
  )
}

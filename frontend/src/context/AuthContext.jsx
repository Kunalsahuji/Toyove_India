import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const savedUser = localStorage.getItem('toyove_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Check in registered users
    const allUsers = JSON.parse(localStorage.getItem('toyove_registered_users') || '[]')
    const foundUser = allUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('toyove_user', JSON.stringify(foundUser))
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('toyove_user')
  }

  const register = (userData) => {
    const allUsers = JSON.parse(localStorage.getItem('toyove_registered_users') || '[]')
    
    // Check if user exists
    if (allUsers.find(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists' }
    }

    allUsers.push(userData)
    localStorage.setItem('toyove_registered_users', JSON.stringify(allUsers))
    return { success: true }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

import { useState, useCallback, useEffect } from 'react'

// Default credentials for demo
const ADMIN_EMAIL = 'admin@sclab.in'
const ADMIN_PASSWORD = 'password'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('sclab_auth')
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      setIsAuthenticated(true)
      setUser(authData.user)
    }
  }, [])

  const login = useCallback((email, password) => {
    setIsLoading(true)
    setError(null)

    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const userData = {
            id: 'admin-001',
            email: email,
            name: 'Admin User',
            role: 'admin'
          }
          setIsAuthenticated(true)
          setUser(userData)
          localStorage.setItem('sclab_auth', JSON.stringify({ user: userData }))
          setIsLoading(false)
          resolve(userData)
        } else {
          setError('Invalid email or password')
          setIsLoading(false)
          reject(new Error('Invalid credentials'))
        }
      }, 500)
    })
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
    setError(null)
    localStorage.removeItem('sclab_auth')
    localStorage.removeItem('sclab_onboarded')
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isAuthenticated,
    user,
    error,
    isLoading,
    login,
    logout,
    clearError
  }
}

import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_addresses')
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Home', firstName: 'John', lastName: 'Doe', address: '123 Toy Street', apartment: 'Apt 4B', city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', phone: '9876543210', isDefault: true },
    ]
  })

  const [savedMethods, setSavedMethods] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_payment_methods')
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'card', label: 'TOYOVOINDIA Virtual Card', last4: '4242', expiry: '12/28', brand: 'Visa' },
    ]
  })

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch {
      setUser(null)
      return null
    }
  }

  useEffect(() => {
    let isMounted = true

    const bootstrapAuth = async () => {
      setAuthLoading(true)
      try {
        const currentUser = await getCurrentUser()
        if (isMounted) setUser(currentUser)
      } catch {
        if (isMounted) setUser(null)
      } finally {
        if (isMounted) setAuthLoading(false)
      }
    }

    bootstrapAuth()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_addresses', JSON.stringify(addresses))
  }, [addresses])

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_payment_methods', JSON.stringify(savedMethods))
  }, [savedMethods])

  const login = async (email, password) => {
    try {
      const loggedInUser = await loginUser({ email, password })
      setUser(loggedInUser)
      return { success: true, user: loggedInUser }
    } catch (error) {
      return { success: false, message: error.message || 'Invalid credentials' }
    }
  }

  const register = async (userData) => {
    try {
      const registeredUser = await registerUser(userData)
      setUser(registeredUser)
      return { success: true, user: registeredUser }
    } catch (error) {
      return { success: false, message: error.message || 'Registration failed' }
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch {
      // Clear local auth state even if the server cookie is already invalid.
    } finally {
      setUser(null)
    }
  }

  const updateUser = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }))
  }

  const addAddress = (address) => {
    const newAddress = { ...address, id: Date.now(), isDefault: addresses.length === 0 }
    setAddresses((prev) => [...prev, newAddress])
  }

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id))
  }

  const updateAddress = (id, updatedAddress) => {
    setAddresses((prev) => prev.map((address) => (
      address.id === id ? { ...updatedAddress, id } : address
    )))
  }

  const setAsDefaultAddress = (id) => {
    setAddresses((prev) => prev.map((address) => ({ ...address, isDefault: address.id === id })))
  }

  const addPaymentMethod = (method) => {
    setSavedMethods((prev) => [...prev, { ...method, id: Date.now() }])
  }

  const removePaymentMethod = (id) => {
    setSavedMethods((prev) => prev.filter((method) => method.id !== id))
  }

  const isAdmin = ['admin', 'super_admin'].includes(user?.role)

  return (
    <AuthContext.Provider value={{
      user,
      authLoading,
      isAdmin,
      refreshUser,
      login,
      register,
      logout,
      updateUser,
      addresses,
      addAddress,
      deleteAddress,
      updateAddress,
      setAsDefaultAddress,
      savedMethods,
      addPaymentMethod,
      removePaymentMethod,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

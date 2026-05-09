import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authApi'
import { getMyAccountData, updateMyAccountData } from '../services/userAccountApi'

const AuthContext = createContext()
const AUTH_USER_STORAGE_KEY = 'TOYOVOINDIA_auth_user'
const readStoredUser = () => {
  try {
    const savedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

const persistAuthUser = (value) => {
  if (value) {
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(value))
  } else {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY)
  }
}

const mergeWithStoredAccessToken = (value) => {
  if (!value) return value
  const storedUser = readStoredUser()
  if (!value.accessToken && storedUser?.accessToken) {
    return {
      ...value,
      accessToken: storedUser.accessToken,
    }
  }
  return value
}

const getScopedStorageKey = (baseKey, user) => {
  const scope = user?.id || user?._id || user?.email || 'guest'
  return `${baseKey}_${scope}`
}

const isLegacyMockAddress = (address) => {
  if (!address) return false
  const firstName = String(address.firstName || '').trim().toLowerCase()
  const lastName = String(address.lastName || '').trim().toLowerCase()
  const street = String(address.address || '').trim().toLowerCase()
  const city = String(address.city || '').trim().toLowerCase()
  return firstName === 'john' && lastName === 'doe' && street.includes('toy street') && city === 'mumbai'
}

const sanitizeAddresses = (value) => {
  if (!Array.isArray(value)) return []
  return value.filter((address) => !isLegacyMockAddress(address))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [authLoading, setAuthLoading] = useState(true)
  const [addresses, setAddresses] = useState([])
  const [savedMethods, setSavedMethods] = useState({ bankAccounts: [], upiIds: [], cards: [] })
  const [preferencesHydrated, setPreferencesHydrated] = useState(false)

  const refreshUser = async () => {
    try {
      const currentUser = mergeWithStoredAccessToken(await getCurrentUser())
      setUser(currentUser)
      persistAuthUser(currentUser)
      return currentUser
    } catch {
      const fallbackUser = readStoredUser()
      setUser(fallbackUser)
      return fallbackUser
    }
  }

  useEffect(() => {
    let isMounted = true

    const bootstrapAuth = async () => {
      setAuthLoading(true)
      try {
        const currentUser = mergeWithStoredAccessToken(await getCurrentUser())
        if (isMounted) {
          setUser(currentUser)
          persistAuthUser(currentUser)
        }
      } catch {
        if (isMounted) setUser((previousUser) => previousUser || readStoredUser())
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
    persistAuthUser(user)
  }, [user])

  useEffect(() => {
    let isMounted = true
    setPreferencesHydrated(false)

    const hydrate = async () => {
      if (user) {
        try {
          const data = await getMyAccountData()
          if (!isMounted) return
          setAddresses(sanitizeAddresses(data.addresses || []))
          setSavedMethods(data.paymentVault || [])
          setPreferencesHydrated(true)
          return
        } catch {
          // fallback to local scoped data
        }
      }

      const addressesKey = getScopedStorageKey('TOYOVOINDIA_addresses', user)
      const paymentMethodsKey = getScopedStorageKey('TOYOVOINDIA_payment_methods', user)
      const savedAddresses = localStorage.getItem(addressesKey)
      const savedMethods = localStorage.getItem(paymentMethodsKey)

      if (!isMounted) return
      setAddresses(savedAddresses ? sanitizeAddresses(JSON.parse(savedAddresses)) : [])
      setSavedMethods(savedMethods ? JSON.parse(savedMethods) : { bankAccounts: [], upiIds: [], cards: [] })
      setPreferencesHydrated(true)
    }

    hydrate()
    return () => {
      isMounted = false
    }
  }, [user?.id, user?._id, user?.email])

  useEffect(() => {
    if (!preferencesHydrated) return
    if (user) {
      updateMyAccountData({ addresses }).catch(() => {})
    } else {
      const addressesKey = getScopedStorageKey('TOYOVOINDIA_addresses', user)
      localStorage.setItem(addressesKey, JSON.stringify(addresses))
    }
  }, [addresses, user, preferencesHydrated])

  useEffect(() => {
    if (!preferencesHydrated) return
    if (user) {
      updateMyAccountData({ paymentVault: savedMethods }).catch(() => {})
    } else {
      const paymentMethodsKey = getScopedStorageKey('TOYOVOINDIA_payment_methods', user)
      localStorage.setItem(paymentMethodsKey, JSON.stringify(savedMethods))
    }
  }, [savedMethods, user, preferencesHydrated])

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

  const addPaymentMethod = (type, method) => {
    setSavedMethods((prev) => ({
      ...prev,
      [type]: [{ ...method, id: Date.now() }, ...(prev[type] || [])],
    }))
  }

  const removePaymentMethod = (type, id) => {
    setSavedMethods((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((method) => method.id !== id),
    }))
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

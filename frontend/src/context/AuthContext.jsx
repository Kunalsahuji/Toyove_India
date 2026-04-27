import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_addresses');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Home', firstName: 'John', lastName: 'Doe', address: '123 Toy Street', apartment: 'Apt 4B', city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', phone: '9876543210', isDefault: true }
    ];
  });

  const [savedMethods, setSavedMethods] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_payment_methods');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'card', label: 'TOYOVOINDIA Virtual Card', last4: '4242', expiry: '12/28', brand: 'Visa' }
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('TOYOVOINDIA_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('TOYOVOINDIA_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_payment_methods', JSON.stringify(savedMethods));
  }, [savedMethods]);

  const login = (email, password) => {
    // Check simulated database in localStorage
    const allUsers = JSON.parse(localStorage.getItem('TOYOVOINDIA_users_list') || '[]');
    const foundUser = allUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    
    // Fallback for demo purposes if someone just types anything
    if (email && password) {
      const fallbackName = email.split('@')[0];
      const userData = { email, firstName: fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1), lastName: '' };
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (userData) => {
    if (userData.email && userData.password) {
      // Save to simulated database
      const allUsers = JSON.parse(localStorage.getItem('TOYOVOINDIA_users_list') || '[]');
      if (allUsers.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already exists' };
      }
      
      const newUser = { ...userData };
      allUsers.push(newUser);
      localStorage.setItem('TOYOVOINDIA_users_list', JSON.stringify(allUsers));
      
      setUser(newUser);
      return { success: true };
    }
    return { success: false, message: 'Please fill all fields' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const addAddress = (address) => {
    const newAddress = { ...address, id: Date.now(), isDefault: addresses.length === 0 };
    setAddresses(prev => [...prev, newAddress]);
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const updateAddress = (id, updatedAddress) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...updatedAddress, id } : a));
  };

  const setAsDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const addPaymentMethod = (method) => {
    setSavedMethods(prev => [...prev, { ...method, id: Date.now() }]);
  };

  const removePaymentMethod = (id) => {
    setSavedMethods(prev => prev.filter(m => m.id !== id));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
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
      removePaymentMethod
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

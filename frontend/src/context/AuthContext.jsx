import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('toyove_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('toyove_addresses');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Home', firstName: 'John', lastName: 'Doe', address: '123 Toy Street', city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', phone: '9876543210', isDefault: true }
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('toyove_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('toyove_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('toyove_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const login = (userData) => {
    setUser({ ...userData, firstName: userData.firstName || 'User', lastName: userData.lastName || '' });
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

  const setAsDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser, 
      addresses, 
      addAddress, 
      deleteAddress, 
      setAsDefaultAddress 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const { user } = useAuth();
  const storageScope = useMemo(() => user?.id || user?._id || user?.email || 'guest', [user]);
  const paymentHistoryKey = `TOYOVOINDIA_payment_history_${storageScope}`;
  const savedMethodsKey = `TOYOVOINDIA_saved_methods_${storageScope}`;
  const ordersKey = `TOYOVOINDIA_orders_${storageScope}`;

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [savedMethods, setSavedMethods] = useState({
    bankAccounts: [],
    upiIds: [],
    cards: []
  });
  const [orders, setOrders] = useState([]);
  const [storageHydrated, setStorageHydrated] = useState(false);

  useEffect(() => {
    setStorageHydrated(false);
    const saved = localStorage.getItem(paymentHistoryKey);
    setPaymentHistory(saved ? JSON.parse(saved) : []);
  }, [paymentHistoryKey]);

  useEffect(() => {
    setStorageHydrated(false);
    const saved = localStorage.getItem(savedMethodsKey);
    setSavedMethods(saved ? JSON.parse(saved) : {
      bankAccounts: [],
      upiIds: [],
      cards: []
    });
  }, [savedMethodsKey]);

  useEffect(() => {
    setStorageHydrated(false);
    const saved = localStorage.getItem(ordersKey);
    setOrders(saved ? JSON.parse(saved) : []);
    setStorageHydrated(true);
  }, [ordersKey]);

  useEffect(() => {
    if (!storageHydrated) return;
    localStorage.setItem(paymentHistoryKey, JSON.stringify(paymentHistory));
  }, [paymentHistory, paymentHistoryKey, storageHydrated]);

  useEffect(() => {
    if (!storageHydrated) return;
    localStorage.setItem(savedMethodsKey, JSON.stringify(savedMethods));
  }, [savedMethods, savedMethodsKey, storageHydrated]);

  useEffect(() => {
    if (!storageHydrated) return;
    localStorage.setItem(ordersKey, JSON.stringify(orders));
  }, [orders, ordersKey, storageHydrated]);

  const addPaymentLog = (log) => {
    setPaymentHistory(prev => [
      { 
        id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`, 
        date: new Date().toLocaleDateString(), 
        status: 'Completed',
        ...log 
      }, 
      ...prev
    ]);
  };

  const addSavedMethod = (type, data) => {
    setSavedMethods(prev => ({
      ...prev,
      [type]: [{ id: Date.now(), ...data }, ...prev[type]]
    }));
  };

  const deleteSavedMethod = (type, id) => {
    setSavedMethods(prev => ({
      ...prev,
      [type]: prev[type].filter(m => m.id !== id)
    }));
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      status: 'Processing',
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    ));
    const order = orders.find(o => o.id === orderId);
    if (order && order.status !== 'Cancelled') {
      addPaymentLog({ type: 'Refund', amount: order.total, method: `REFUND (${orderId})` });
    }
  };

  const simulatePayment = async (amount, method) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addPaymentLog({ type: 'Debit', amount, method: method.toUpperCase() });
        resolve(true);
      }, 3000);
    });
  };

  return (
    <PaymentContext.Provider value={{ 
      paymentHistory, 
      savedMethods,
      orders,
      addSavedMethod,
      deleteSavedMethod,
      simulatePayment,
      addPaymentLog,
      addOrder,
      cancelOrder
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);

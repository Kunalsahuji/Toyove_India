import { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [paymentHistory, setPaymentHistory] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_payment_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedMethods, setSavedMethods] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_saved_methods');
    return saved ? JSON.parse(saved) : {
      bankAccounts: [],
      upiIds: [],
      cards: []
    };
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_payment_history', JSON.stringify(paymentHistory));
  }, [paymentHistory]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_saved_methods', JSON.stringify(savedMethods));
  }, [savedMethods]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_orders', JSON.stringify(orders));
  }, [orders]);

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

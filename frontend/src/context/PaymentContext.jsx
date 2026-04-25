import { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_wallet_balance');
    return saved ? parseFloat(saved) : 500.00; 
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 'TXN-9901', type: 'Credit', amount: 500.00, method: 'Welcome Bonus', date: new Date().toLocaleDateString(), status: 'Completed' }
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('TOYOVOINDIA_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_orders', JSON.stringify(orders));
  }, [orders]);

  const addTransaction = (txn) => {
    setTransactions(prev => [
      { 
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`, 
        date: new Date().toLocaleDateString(), 
        status: 'Completed',
        ...txn 
      }, 
      ...prev
    ]);
  };

  const topUpWallet = (amount, method = 'Wallet Top-up') => {
    const numAmt = parseFloat(amount);
    if (isNaN(numAmt)) return;
    setWalletBalance(prev => prev + numAmt);
    addTransaction({ type: 'Credit', amount: numAmt, method });
  };

  const payWithWallet = (amount) => {
    if (walletBalance >= amount) {
      setWalletBalance(prev => prev + (amount * -1));
      addTransaction({ type: 'Debit', amount, method: 'Order Payment' });
      return true;
    }
    return false;
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
    // Refund to wallet? Let's be professional and refund.
    const order = orders.find(o => o.id === orderId);
    if (order && order.status !== 'Cancelled') {
      setWalletBalance(prev => prev + order.total);
      addTransaction({ type: 'Credit', amount: order.total, method: `REFUND (${orderId})` });
    }
  };

  const simulatePayment = async (amount, method) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addTransaction({ type: 'Debit', amount, method: method.toUpperCase() });
        resolve(true);
      }, 3000);
    });
  };

  return (
    <PaymentContext.Provider value={{ 
      walletBalance, 
      transactions, 
      orders,
      topUpWallet, 
      payWithWallet,
      simulatePayment,
      addTransaction,
      addOrder,
      cancelOrder
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);

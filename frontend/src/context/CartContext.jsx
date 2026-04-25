import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('TOYOVOINDIA_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('TOYOVOINDIA_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [compare, setCompare] = useState(() => {
    const savedCompare = localStorage.getItem('TOYOVOINDIA_compare');
    return savedCompare ? JSON.parse(savedCompare) : [];
  });

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('TOYOVOINDIA_compare', JSON.stringify(compare));
  }, [compare]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prev, { ...product, qty: quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const toggleCompare = (product) => {
    setCompare(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("Comparison list is full (max 4 products)");
        return prev;
      }
      return [...prev, product];
    });
  };

  const clearCompare = () => setCompare([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, wishlist, compare, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist,
      toggleCompare, clearCompare, subtotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

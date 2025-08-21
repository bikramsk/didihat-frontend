import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('didihat_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't save until we've loaded from localStorage

    try {
      localStorage.setItem('didihat_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems, isInitialized]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.type === item.type &&
        cartItem.selectedDate === item.selectedDate &&
        cartItem.selectedTime === item.selectedTime
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1)
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, cartId: Date.now() + Math.random() }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  // Update item quantity
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart totals
  const getCartTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const itemPrice = item.totalPrice || item.price || 0;
      return total + (itemPrice * item.quantity);
    }, 0);

    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
    };
  };

  // Get items by type
  const getItemsByType = (type) => {
    return cartItems.filter(item => item.type === type);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotals,
    getItemsByType
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

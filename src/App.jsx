// File: src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screen from './pages/home';
import Checkout from './pages/checkout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = product => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Screen
              cart={cart}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

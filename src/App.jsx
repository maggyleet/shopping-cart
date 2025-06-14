import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './components/Cart/Cart';
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (id, newQuantity) => {
    setCartItems(prev => {
      if (newQuantity <= 0) {
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <Navbar cartItems={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateCart={updateCart}
              removeFromCart={removeFromCart}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
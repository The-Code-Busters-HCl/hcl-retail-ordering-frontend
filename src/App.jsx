import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import AddItem from './pages/AddItem';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout wrapper */}
        <Route path="/" element={<MainLayout />}>

          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Products (public or protected — your choice) */}
          <Route path="products" element={<Products />} />

          {/* Protected Routes */}
          <Route 
            path="cart" 
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } 
          />

          <Route 
            path="orders" 
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            } 
          />

          {/* Admin / Add Item */}
          <Route 
            path="additem"   // ✅ FIXED URL
            element={
              <PrivateRoute>
                <AddItem />
              </PrivateRoute>
            } 
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
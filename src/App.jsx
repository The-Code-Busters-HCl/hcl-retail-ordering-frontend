import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; // Keeping just in case, but unused
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import AddItem from './pages/AddItem';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

    {/* ✅ ADD THIS */}
          <Route path="/add/item" element={<AddItem />} />
          
          <Route 
            path="/products" 
            element={
             
                <Products />
              
            } 
          />
          <Route 
            path="/cart" 
            element={
              // <PrivateRoute>
                <Cart />
              // </PrivateRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              // <PrivateRoute>
                <Orders />
              // </PrivateRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

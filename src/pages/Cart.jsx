import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock API fetch for GET /cart
    const fetchCart = async () => {
      try {
        // const response = await fetch('/cart');
        // const data = await response.json();

        setTimeout(() => {
          const storedCart = JSON.parse(
            localStorage.getItem("mockCart") || "[]",
          );
          setCartItems(storedCart);
          setLoading(false);
        }, 300);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("mockCart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("mockCart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

 const handleCheckout = async () => {
  if (cartItems.length === 0) return;

  try {
    // ✅ Send productId + quantity
    const products = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    const response = await fetch('http://localhost:8145/order/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // keep if needed
      },
      body: JSON.stringify({
        products: products
      })
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }

    // ✅ same behavior as before
    alert('Order placed successfully!');
    
    setCartItems([]);
    localStorage.removeItem('mockCart');

    navigate('/orders');

  } catch (error) {
    console.error('Error during checkout:', error);
    alert('Error placing order');
  }
};

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is currently empty. <br />
          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/products")}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <ul className="list-group list-group-flush">
                {cartItems.map((item) => (
                  <li className="list-group-item p-3" key={item.id}>
                    <div className="row align-items-center">
                      <div className="col-md-2 text-center text-md-start">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ height: "60px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4 mt-2 mt-md-0 text-center text-md-start">
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">
                          ${item.price.toFixed(2)} each
                        </small>
                      </div>
                      <div className="col-md-3 mt-2 mt-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="col-md-3 mt-3 mt-md-0 text-center text-md-end">
                        <span className="fw-bold me-3 text-success">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Taxes (8%)</span>
                  <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold fs-5 text-success">
                    ${(calculateTotal() * 1.08).toFixed(2)}
                  </span>
                </div>
                <button
                  className="btn btn-success w-100"
                  onClick={handleCheckout}
                >
                  Checkout / Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

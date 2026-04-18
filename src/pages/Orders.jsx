import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API fetch for GET /orders
    const fetchOrders = async () => {
      try {
        // Example API Call
        // const response = await fetch('/orders', {
        //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        // });
        // const data = await response.json();
        
        setTimeout(() => {
          const storedOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
          setOrders(storedOrders);
          setLoading(false);
        }, 400);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

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
      <h2 className="mb-4">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="alert alert-info">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="row g-4">
          {orders.map(order => (
            <div className="col-12" key={order.id}>
              <div className="card shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted me-3">Order #{order.id}</span>
                    <span>{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</span>
                  </div>
                  <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless table-sm mb-0">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th className="text-center">Qty</th>
                          <th className="text-end">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-top">
                          <td colSpan="2" className="fw-bold text-end pe-3">Subtotal:</td>
                          <td className="text-end">${order.total.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="fw-bold text-end pe-3">Total (incl. tax):</td>
                          <td className="fw-bold text-end text-success">${(order.total * 1.08).toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

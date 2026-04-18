import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const mockProducts = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'pizza', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Pepperoni Pizza', price: 14.99, category: 'pizza', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Coca Cola', price: 2.99, category: 'drinks', img: 'https://images.unsplash.com/photo-1554866585-cd94860874b7?auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Garlic Bread', price: 5.99, category: 'bread', img: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=300&q=80' }
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API fetch
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Example API Call
        // const response = await fetch('/products');
        // const data = await response.json();
        
        // Simulating network delay for mock implementation
        setTimeout(() => {
          if (categoryFilter) {
            setProducts(mockProducts.filter(p => p.category === categoryFilter));
          } else {
            setProducts(mockProducts);
          }
          setLoading(false);
        }, 300);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryFilter]);

  const handleAddToCart = async (product) => {
    try {
      // Example POST to /cart API Call
      /*
      const response = await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      */
      
      // Store in simple localStorage cart for demo purposes without a real backend
      const currentCart = JSON.parse(localStorage.getItem('mockCart') || '[]');
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        currentCart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem('mockCart', JSON.stringify(currentCart));
      alert(`Added ${product.name} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="row g-4">
      {/* Sidebar column: auto collapses into offcanvas on small screens */}
      <div className="col-md-4 col-lg-3">
        <Sidebar />
      </div>
      
      {/* Main products content */}
      <div className="col-md-8 col-lg-9">
        <h2 className="mb-4">{categoryFilter ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1) : 'Our Menu'}</h2>
        
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map(product => (
              <div className="col" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img src={product.img} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text fw-bold text-success">${product.price.toFixed(2)}</p>
                    <button 
                      className="btn btn-primary mt-auto" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

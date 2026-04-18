import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard'; // ✅ Import added

const mockProducts = [
  { 
    id: 1, 
    name: 'Margherita Pizza', 
    description: 'Classic cheese pizza with fresh tomatoes and basil',
    price: 12.99, 
    category: 'pizza', 
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80' 
  },
  { 
    id: 2, 
    name: 'Pepperoni Pizza', 
    description: 'Loaded with pepperoni and extra cheese',
    price: 14.99, 
    category: 'pizza', 
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' 
  },
  { 
    id: 3, 
    name: 'Coca Cola', 
    description: 'Refreshing chilled soft drink',
    price: 2.99, 
    category: 'drinks', 
    img: 'https://images.unsplash.com/photo-1554866585-cd94860874b7?auto=format&fit=crop&w=300&q=80' 
  },
  { 
    id: 4, 
    name: 'Garlic Bread', 
    description: 'Toasted bread with garlic butter and herbs',
    price: 5.99, 
    category: 'bread', 
    img: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=300&q=80' 
  }
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (categoryFilter) {
        setProducts(mockProducts.filter(p => p.category === categoryFilter));
      } else {
        setProducts(mockProducts);
      }
      setLoading(false);
    }, 300);

  }, [categoryFilter]);

  const handleAddToCart = (product) => {
    try {
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

      {/* Sidebar */}
      <div className="col-md-4 col-lg-3">
        <Sidebar />
      </div>

      {/* Products */}
      <div className="col-md-8 col-lg-9">
        <h2 className="mb-4">
          {categoryFilter 
            ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)
            : 'Our Menu'}
        </h2>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            {/* ✅ Updated map function */}
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
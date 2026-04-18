import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8145/product');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        // ✅ Map backend → frontend format
        const formattedProducts = data.map(p => ({
          ...p,
          img: p.image // 🔥 important fix (your card uses img)
        }));

        if (categoryFilter) {
          setProducts(
            formattedProducts.filter(p => p.category === categoryFilter)
          );
        } else {
          setProducts(formattedProducts);
        }

      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
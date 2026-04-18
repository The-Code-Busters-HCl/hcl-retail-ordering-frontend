import React from 'react';

const Home = () => {
  return (
    <div>
      <h1 className="mb-4">Welcome to FoodOrdering App</h1>
      <p className="lead">Order your favorite Pizza, Drinks, and Bread with ease.</p>
      <div className="alert alert-info">
        <strong>Tip:</strong> Browse the <b>Menu</b> to start adding items to your cart!
      </div>
    </div>
  );
};

export default Home;

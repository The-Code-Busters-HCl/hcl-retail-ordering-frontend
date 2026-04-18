import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">

        {/* Image */}
        <img
          src={product.img}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />

        {/* Body */}
        <div className="card-body d-flex flex-column">

          {/* Category */}
          <span className="badge bg-secondary mb-2">
            {product.category}
          </span>

          {/* Name */}
          <h5 className="card-title">{product.name}</h5>

          {/* Description */}
          {/* <p
            className="card-text text-muted"
            style={{
              fontSize: '14px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.description}
          </p> */}

          {/* Price */}
          <p className="card-text fw-bold text-success">
            ${product.price.toFixed(2)}
          </p>

          {/* Button */}
          <button
            className="btn btn-primary mt-auto"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
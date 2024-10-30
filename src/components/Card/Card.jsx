import React from 'react';
import './Card.css';

const Card = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Rating: {product.rating} / 5</p>
    </div>
  );
};

export default Card;

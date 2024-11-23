import React from "react";

export function ProductCart({ image, product, price, stock, addToCart }) {
  return (
    <div className="product">
      <img src={image} alt={product} />
      <h3>{product}</h3>
      <p>Price: {price} kr</p>
      <p>Stock: {stock} pcs</p>
      <button onClick={addToCart} disabled={stock <= 0}>
        {stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
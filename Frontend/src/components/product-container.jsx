import React from "react";
import { ProductCart } from "./ProductCart";

export function ProductContainer({ products, setCart, cart, setProducts }) {
  const addToCart = (product) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    );
    setProducts(updatedProducts);
    setCart([...cart, product]);
  };

  return (
    <div className="product-container">
      {products.map(({ id, image, name, price, stock }) => (
        <ProductCart
          key={id}
          image={image}
          product={name}
          price={price}
          stock={stock}
          addToCart={() => addToCart({ id, name, price })}
        />
      ))}
    </div>
  );
}
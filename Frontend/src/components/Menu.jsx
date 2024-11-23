import React from 'react';

export function Menu({ setCurrentPage, cart }) {
  const totalItems = cart.length;
  
  return (
    <nav>
      <ul>
        <li onClick={() => setCurrentPage('products')} > Products </li>
        <li onClick={() => setCurrentPage('cart')} > Cart {totalItems > 0 && `(${totalItems})`}  </li>
      </ul>
    </nav>
  );
}
import React from "react";

export function ShoppingCart({ cart, setCart, setCurrentPage }) {
  const productCount = cart.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});

  const handlePayment = () => {
    if (cart.length === 0) return;
  
    const purchasedItems = Object.values(
      cart.reduce((acc, item) => {
        if (acc[item.id]) {
          acc[item.id].quantity += 1;
        } else {
          acc[item.id] = { id: item.id, quantity: 1 };
        }
        return acc;
      }, {})
    );
  

    fetch('http://localhost:3000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchasedItems),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setCart([]);
        setCurrentPage('payment-confirmation');
      })
      .catch(error => {
        console.error('Error updating stock:', error);
      });
  };
  
  const handleClearCart = () => {
    setCart([]);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };
  const totalPrice = cart.reduce((acc, item) => acc + item.price * productCount[item.name], 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {Object.keys(productCount).map((productName) => (
            <div key={productName} className="cart-item">
              <h3>{productName}</h3>
              <p>Number of products: {productCount[productName]}</p>
              <p>Price per item: {cart.find((item) => item.name === productName).price} kr</p>
            </div>
          ))}
          <h3>Total Price: {totalPrice} kr</h3>
          <button onClick={handlePayment} className="payBtn">Purchase</button>
          <button onClick={handleClearCart} >Clear Cart</button>
        </>
      )}
    </div>
  );
}
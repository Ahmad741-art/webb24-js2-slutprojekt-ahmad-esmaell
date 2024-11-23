import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { ProductContainer } from "./components/ProductContainer";
import { ShoppingCart } from "./components/ShoppingCart";
import { PaymentConfirmation } from "./components/PaymentConfirmation";

export function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('products');

  useEffect(() => {
    fetch('http://localhost:3000/products') 
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <header>
        <h1>Snag & Bag Shop</h1>
        <Menu setCurrentPage={setCurrentPage} cart={cart}/>
      </header>

      <main>
        {currentPage === 'products' && (
          <ProductContainer products={products} setCart={setCart} cart={cart} setProducts={setProducts} />
        )}
        {currentPage === 'cart' && (
          <ShoppingCart cart={cart} setCart={setCart} setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'payment-confirmation' && (
          <PaymentConfirmation  setCurrentPage={setCurrentPage} />
        )}
      </main>
    </>
  );
}
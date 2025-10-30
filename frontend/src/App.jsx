import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";   
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [page, setPage] = useState("products");
  const [cartUpdated, setCartUpdated] = useState(false);

  return (
    <div className="app">
      <nav className="navbar">
        <h2 onClick={() => setPage("products")}>🛒 Mock E-Com Cart</h2>
        <div>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>Cart</button>
          <button onClick={() => setPage("checkout")}>Checkout</button>
        </div>
      </nav>

      <div className="content">
        {page === "products" && (
          <ProductList onCartUpdate={() => setCartUpdated(!cartUpdated)} />
        )}
        {page === "cart" && <Cart cartUpdated={cartUpdated} />}
        {page === "checkout" && <Checkout />}
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
    
  );
}

export default App;


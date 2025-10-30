// src/components/Checkout.js
import React, { useState, useEffect } from "react";
import { checkout, getCart } from "../api";

const Checkout = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0 });

  // Load cart total before checkout
  useEffect(() => {
    getCart()
      .then((res) => setCart(res.data))
      .catch(() => alert("Error loading cart"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // Send form + total to backend
    checkout({ ...form, total: cart.total, items: cart.items })
      .then((res) => {
        setReceipt(res.data);
      })
      .catch(() => alert("Checkout failed"));
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {receipt && (
        <div className="modal">
          <h3>✅ Checkout Successful</h3>
          <p>Total: ₹{ cart.total}</p>
          <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={() => setReceipt(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;


import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api";
import { toast } from 'react-toastify';


const Cart = ({ cartUpdated }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });


  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.qty, 0);


  useEffect(() => {
    getCart()
      .then((res) => {
        const items = res.data.items || [];
        const total = calculateTotal(items);
        setCart({ items, total });
      })
      .catch(() => alert("Error loading cart"));
  }, [cartUpdated]);


  const handleRemove = (id) => {
    removeFromCart(id)
      .then(() => {
         toast.success(` Item remove successfully!`);
        setCart((prev) => {
          const updatedItems = prev.items.filter((i) => i.id !== id);
          const updatedTotal = calculateTotal(updatedItems);
          return { items: updatedItems, total: updatedTotal };
        });
      })
      .catch(() => alert("Failed to remove item"));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.Image} alt={item.name} width="80" />
              <span>{item.name}</span>
              <span>Qty: {item.qty}</span>
              <span>₹{item.price}</span>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}

          <h3>Total: ₹{cart.total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;

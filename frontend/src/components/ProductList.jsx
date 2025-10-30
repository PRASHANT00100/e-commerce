// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";
import { toast } from 'react-toastify';

const ProductList = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAdd = (productId) => {
    addToCart({ productId, qty: 1 })
      .then(() => {
         toast.success('Item added to cart!');
        onCartUpdate();
      })
      .catch(() => alert("Failed to add item"));
  };

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.Image} alt={p.name}  />
          <h3>name : {p.name}</h3>
          <p>price : ₹{p.price}</p>
          <button onClick={() => handleAdd(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

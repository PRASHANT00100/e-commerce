// backend/routes/cartRoutes.js
import express from "express";
const router = express.Router();

// In-memory cart
let cart = [];

// Helper to calculate total
const calcTotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
};

// GET /api/cart
router.get("/", (req, res) => {
  const total = calcTotal(cart);
  res.json({ items: cart, total });
});

// POST /api/cart → Add item
router.post("/", (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) {
    return res.status(400).json({ error: "productId and qty required" });
  }

  // Normally you'd fetch product from DB; using static data
  const productList =  [
  { id: 1, Image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171", name: "Laptop", price: 800 },
  { id: 2,Image:"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2013", name: "Headphones", price: 120 },
  { id: 3,Image:"https://images.unsplash.com/photo-1637160151663-a410315e4e75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687", name: "Smartwatch", price: 200 },
  { id: 4,Image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2065", name: "Keyboard", price: 60 },
  { id: 5,Image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1167", name: "Mouse", price: 40 },
  { id: 6,Image:"https://images.unsplash.com/photo-1585792180666-f7347c490ee2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2077", name: "Monitor", price: 300 },
  { id: 7,Image:"https://plus.unsplash.com/premium_photo-1669262667978-5d4aafe29dd5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=715", name: "USB Cable", price: 20 },
  { id: 8,Image:"https://images.unsplash.com/photo-1617975316514-69cd7e16c2a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", name: "Phone Stand", price: 25 },
];

  const product = productList.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId,Image:product.Image, name: product.name, price: product.price, qty });
  }

  res.send({ message: "Item added", cart });
});

// DELETE /api/cart/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((item) => item.id !== id);
  res.send({ message: "Item removed", cart });
});

export default router;

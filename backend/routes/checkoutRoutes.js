// backend/routes/checkoutRoutes.js
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  // Mock checkout result
  const receipt = {
    message: "Checkout successful!",
    total: Math.floor(Math.random() * 1000) + 100, // mock total
    timestamp: new Date().toISOString(),
    name,
    email,
  };

  res.send(receipt);
});

export default router;

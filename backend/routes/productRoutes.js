// backend/routes/productRoutes.js
import express from "express";
const router = express.Router();
import product from "../schemas/product.js";
import mongoose from "mongoose";


const newproduct =[
  { id: 1, Image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171", name: "Laptop", price: 800 },
  { id: 2,Image:"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2013", name: "Headphones", price: 120 },
  { id: 3,Image:"https://images.unsplash.com/photo-1637160151663-a410315e4e75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687", name: "Smartwatch", price: 200 },
  { id: 4,Image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2065", name: "Keyboard", price: 60 },
  { id: 5,Image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1167", name: "Mouse", price: 40 },
  { id: 6,Image:"https://images.unsplash.com/photo-1585792180666-f7347c490ee2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2077", name: "Monitor", price: 300 },
  { id: 7,Image:"https://plus.unsplash.com/premium_photo-1669262667978-5d4aafe29dd5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=715", name: "USB Cable", price: 20 },
  { id: 8,Image:"https://images.unsplash.com/photo-1617975316514-69cd7e16c2a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", name: "Phone Stand", price: 25 },
];

router.post("/add", async (req, res) => {
  
    const count = await product.countDocuments();
    if (count === 0) {
      await product.insertMany(newproduct);
      res.send(" Products added successfully");
    } else {
      res.send(" Products already exist");
    }

});


router.get("/",async (req, res) => {
  const allproducts = await product.find({});
  res.send(allproducts);
});

export default router;

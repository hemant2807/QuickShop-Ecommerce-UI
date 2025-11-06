import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import order from "./models/order.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    if (!cartItems?.length) {
      return res.status(400).json({ message: "cartItems required" });
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const receipt = {
      receiptId: `rcpt_${Date.now()}`,
      total,
      name,
      email,
      timestamp: new Date().toISOString(),
      items: cartItems,
    };

    await order.create(receipt);

    return res.status(201).json(receipt);
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

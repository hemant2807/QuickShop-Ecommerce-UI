import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  receiptId: String,
  total: Number,
  name: String,
  email: String,
  timestamp: String,
  items: [
    {
      productId: String,
      qty: Number,
      price: Number,
    },
  ],
});

export default mongoose.model("order", orderSchema);

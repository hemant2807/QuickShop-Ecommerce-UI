import { Router } from "express";

const router = Router();

let cart = [];
const calcTotal = () =>
  cart.reduce((sum, item) => sum + item.price * item.qty, 0);

router.get("/", (req, res) => {
  res.json({ items: cart, total: calcTotal() });
});

router.post("/", (req, res) => {
  const { productId, qty, name, price, imgUrl } = req.body || {};
  const quantity = Number(qty) || 1;
  if (!productId || quantity < 1) {
    return res
      .status(400)
      .json({ message: "productId and qty>=1 are required" });
  }
  const existing = cart.find((c) => c.productId === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      productId,
      name: name ?? null,
      price: Number(price) || 0,
      imgUrl: imgUrl ?? null,
      qty: quantity,
    });
  }
  res.status(201).json({ items: cart, total: calcTotal() });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const before = cart.length;
  cart = cart.filter((c) => c.productId !== id);
  if (cart.length === before) {
    return res.status(404).json({ message: "Item not in cart" });
  }
  res.json({ items: cart, total: calcTotal() });
});

export default router;

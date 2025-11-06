import { Router } from "express";

const router = Router();

router.get("/external", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const external = await response.json();
    const mapped = external.map((p) => ({
      id: String(p.id),
      productName: p.title,
      imgUrl: p.image,
      price: p.price,
      category: p.category,
    }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FakeStore API" });
  }
});

export default router;

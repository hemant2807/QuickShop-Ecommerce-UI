import { createSlice } from "@reduxjs/toolkit";

const storedCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

const initialState = {
  cartList: storedCartList,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productToAdd.id,
          qty: quantity,
        }),
      }).catch((err) => console.error("Backend addToCart error:", err));
      const productExit = state.cartList.find(
        (item) => item.id === productToAdd.id
      );
      if (productExit) {
        state.cartList = state.cartList.map((item) =>
          item.id === action.payload.product.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item
        );
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    decreaseQty: (state, action) => {
      const productTodecreaseQnty = action.payload;
      const productExit = state.cartList.find(
        (item) => item.id === productTodecreaseQnty.id
      );
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter(
          (item) => item.id !== productExit.id
        );
      } else {
        state.cartList = state.cartList.map((item) =>
          item.id === productExit.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        );
      }
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      fetch(`http://localhost:5000/api/cart/${productToDelete.id}`, {
        method: "DELETE",
      }).catch((err) => console.error("Delete failed:", err));
      state.cartList = state.cartList.filter(
        (item) => item.id !== productToDelete.id
      );
    },
  },
});

export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;

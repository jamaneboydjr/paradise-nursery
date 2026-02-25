import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: {}, // { [id]: { id, name, price, image, qty } }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if (!state.items[product.id]) {
        state.items[product.id] = { ...product, qty: 1 };
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) state.items[id].qty += 1;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;

      if (state.items[id].qty > 1) {
        state.items[id].qty -= 1;
      } else {
        delete state.items[id];
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export const selectCartItemsArray = (state) => Object.values(state.cart.items);

export const selectTotalItems = (state) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.qty, 0);

export const selectTotalAmount = (state) =>
  Object.values(state.cart.items).reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

export default cartSlice.reducer;

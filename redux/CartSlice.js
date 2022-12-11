import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      let product = {
        ...action.payload.product,
      };
      let existingItem = state.cartItems.find((ele) => ele.id === product.id);

      if (existingItem) {
        existingItem.picks += 1;
      } else {
        Object.assign(product, { picks: 1 });
        state.cartItems.push(product);
      }
    },
    decreasePick(state, action) {
      let item = action.payload.item;
      let existingItem = state.cartItems.find((ele) => ele.id === item.id);

      if (existingItem.picks > 0) existingItem.picks -= 1;
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (ele) => ele.id !== action.payload.id
      );
    },
    clearCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const CartActions = CartSlice.actions;
export default CartSlice;

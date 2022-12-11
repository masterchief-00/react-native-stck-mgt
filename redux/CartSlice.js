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
        product.picks += 1;
      } else {
        Object.assign(product, { picks: 1 });
        state.cartItems.push(product);
      }

      console.log(state.cartItems);
    },
  },
});

export const CartActions = CartSlice.actions;
export default CartSlice;

import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      for (let item of action.payload.list) {
        if (!state.products.find((i) => i.id === item.id)) {
          state.products.push(item);
        } else {
          continue;
        }
      }
    },
  },
});

export const ProductActions = ProductSlice.actions;
export default ProductSlice;

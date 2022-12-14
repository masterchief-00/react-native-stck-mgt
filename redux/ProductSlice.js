import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filtered: [],
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
    filterProductsByCategory(state, action) {
      state.filtered = state.products.filter(
        (item) => item.category_id === action.payload
      );
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (ele) => ele.id !== action.payload
      );
    },
    clearProducts(state, action) {
      state.products = [];
      state.filtered = [];
    },
  },
});

export const ProductActions = ProductSlice.actions;
export default ProductSlice;

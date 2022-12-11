import { configureStore } from "@reduxjs/toolkit";
import appThemeSlice from "./appThemeSlice";
import CartSlice from "./CartSlice";
import CategorySlice from "./CategorySlice";
import OrderSlice from "./OrderSlice";
import ProductSlice from "./ProductSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    theme: appThemeSlice.reducer,
    user: UserSlice.reducer,
    product: ProductSlice.reducer,
    category: CategorySlice.reducer,
    order: OrderSlice.reducer,
    cart: CartSlice.reducer,
  },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import appThemeSlice from "./appThemeSlice";

const store = configureStore({
  reducer: {
    theme: appThemeSlice.reducer,
  },
});
export default store;

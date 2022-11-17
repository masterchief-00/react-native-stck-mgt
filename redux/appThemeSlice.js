import { createSlice } from "@reduxjs/toolkit";

const appThemeSlice = createSlice({
  name: "theme",
  initialState: {
    light: true,
  },
  reducers: {
    setTheme(state, action) {
      state.light = action.payload;
    },
  },
});

export const ThemeActions = appThemeSlice.actions;
export default appThemeSlice;

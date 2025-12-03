import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
      state.isMobileMenuOpen = false;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
  },
});

export const { openCart, closeCart, toggleMobileMenu, closeMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;

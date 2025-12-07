import { CheckoutStep } from "@/types/CheckoutType";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isMobileMenuOpen: false,
  isPaymentOpen: false,
  checkoutStep: "cart" as CheckoutStep,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
      state.isMobileMenuOpen = false;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.checkoutStep = "cart";
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    setCheckoutStep: (state, action) => {
      state.checkoutStep = action.payload;
    },
  },
});

export const { openModal, closeModal, toggleMobileMenu, closeMobileMenu, setCheckoutStep } = uiSlice.actions;
export default uiSlice.reducer;

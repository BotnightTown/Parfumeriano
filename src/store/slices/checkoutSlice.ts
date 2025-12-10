import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "Kyiv",
  deliveryMethod: "courier",
  deliveryWay: "our_shop",
  paymentMethod: "google_pay"
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
    },
    setDeliveryWay: (state, action) => {
      state.deliveryWay = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    }
  }
});

export const { setCity, setDeliveryMethod, setDeliveryWay, setPaymentMethod } = checkoutSlice.actions;
export default checkoutSlice.reducer;
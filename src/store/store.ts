import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { ProductType } from "@/types/ProductType";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("products") || "[]") : [],
}

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product: ProductType) => product.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((product: ProductType) => product.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  }
})

export const { addProduct, deleteProduct, updateProduct } = adminProductSlice.actions;
export default adminProductSlice.reducer;
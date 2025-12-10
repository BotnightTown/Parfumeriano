'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("isAdmin") || "false")
    : false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state) => {
      state.isAdmin = true;
    },
    logoutAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;

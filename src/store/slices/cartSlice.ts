import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/types/ProductType";

export interface CartItemType extends ProductType {
  quantity: number;
}

interface CartState {
  items: CartItemType[];
}

function loadCart() {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const initialState: CartState = {
  items: typeof window !== "undefined" ? loadCart() : [],
};

const saveCart = (items: CartItemType[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItemType>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantityInCart: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      saveCart(state.items);
    },
    clearCartItems: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantityInCart, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
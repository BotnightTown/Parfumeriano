"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CurrencyProvider } from "@/context/CurrencyContext";
import CartModal from "@/components/Cart/CartModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CurrencyProvider>
        {children}
        <CartModal />
      </CurrencyProvider>
    </Provider>
  )

}

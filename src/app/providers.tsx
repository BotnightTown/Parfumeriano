"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </Provider>
  )

}

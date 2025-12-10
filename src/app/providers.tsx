"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CartModal from "@/components/Checkout/CheckoutModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CurrencyProvider>
        <LanguageProvider>
          {children}
          <CartModal />
        </LanguageProvider>
      </CurrencyProvider>
    </Provider>
  )

}

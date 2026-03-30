"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SessionProvider } from "next-auth/react";
import CartModal from "@/components/Checkout/CheckoutModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <CurrencyProvider>
          <LanguageProvider>
            {children}
            <CartModal />
          </LanguageProvider>
        </CurrencyProvider>
      </SessionProvider>
    </Provider>
  );
}

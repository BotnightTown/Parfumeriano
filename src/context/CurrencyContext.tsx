"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CurrencyContextType {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<string>("UAH");

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used inside CurrencyProvider");
  return context;
};

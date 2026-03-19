import { ProductType } from "@/types/ProductType";
import axios from "axios";
import { useEffect, useState } from "react";

interface FilterProps {
  brand?: string;
  onlySale?: boolean;
  isNew?: boolean;
  gender?: string;
}

export function useFilterList({ brand, onlySale, isNew, gender }: FilterProps) {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (onlySale) params.set("onlySale", "true");
    if (isNew) params.set("isNew", "true");
    if (gender) params.set("gender", gender);

    axios
      .get<ProductType[]>(`/api/products?${params.toString()}`)
      .then(({ data }) => setProducts(data));
  }, [brand, onlySale, isNew, gender]);

  return products;
}

export const getProductById = (id: number, products: ProductType[]) => {
  return products.find((product) => product.id === id);
};

export function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const exchangeRates: Record<string, number> = {
  UAH: 42.21,
  USD: 1,
  EUR: 0.86,
};

export function convertPrice(price: number, currency: string): number {
  const rate = exchangeRates[currency];
  if (!rate) return price;
  return price * rate;
}

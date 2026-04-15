"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCurrency } from "@/context/CurrencyContext";
import { convertPrice, formatPrice } from "@/lib/product";

type BrandStats = {
  brand: string;
  productCount: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  saleCount: number;
  totalOrders: number;
  totalRevenue: number;
};

function BrandStatsSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-xl p-6 flex flex-col gap-3">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="h-16 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatsPage() {
  const [brands, setBrands] = useState<BrandStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useCurrency();

  useEffect(() => {
    axios
      .get<BrandStats[]>("/api/stats/brands")
      .then(({ data }) => setBrands(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex-1 w-full px-6 md:px-10 lg:px-20 py-10 flex flex-col gap-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Статистика брендів</h1>

      {loading ? (
        <BrandStatsSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {brands.map((brand) => (
            <div
              key={brand.brand}
              className="border rounded-xl p-6 flex flex-col gap-4"
            >
              <h2 className="text-xl font-semibold">{brand.brand}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="border rounded-lg p-3 flex flex-col gap-1">
                  <p className="text-2xl font-bold">{brand.productCount}</p>
                  <p className="text-xs text-gray-500">Товарів</p>
                </div>
                <div className="border rounded-lg p-3 flex flex-col gap-1">
                  <p className="text-2xl font-bold">{brand.totalOrders}</p>
                  <p className="text-xs text-gray-500">Замовлень</p>
                </div>
                <div className="border rounded-lg p-3 flex flex-col gap-1">
                  <p className="text-2xl font-bold">{brand.saleCount}</p>
                  <p className="text-xs text-gray-500">Товарів зі знижкою</p>
                </div>
                <div className="border rounded-lg p-3 flex flex-col gap-1">
                  <p className="text-lg font-bold">
                    {formatPrice(
                      convertPrice(brand.avgPrice, currency),
                      currency,
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Середня ціна</p>
                </div>
                <div className="border rounded-lg p-3 flex flex-col gap-1">
                  <p className="text-lg font-bold">
                    {formatPrice(
                      convertPrice(brand.minPrice, currency),
                      currency,
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Мінімальна ціна</p>
                </div>
                <div className="border rounded-lg p-3 flex flex-col gap-1">
                  <p className="text-lg font-bold">
                    {formatPrice(
                      convertPrice(brand.maxPrice, currency),
                      currency,
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Максимальна ціна</p>
                </div>
                <div className="border rounded-lg p-3 flex flex-col gap-1">
                  <p className="text-lg font-bold">
                    {formatPrice(
                      convertPrice(brand.totalRevenue, currency),
                      currency,
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Виручка</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

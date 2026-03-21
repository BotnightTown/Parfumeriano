"use client";

import NewProduct from "@/components/NewProduct";
import { ProductType } from "@/types/ProductType";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewProducts() {
      try {
        const res = await axios.get<ProductType[]>("/api/products?isNew=true");
        setProducts(res.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching new products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNewProducts();
  }, []);

  if (loading)
    return (
      <main className="w-full flex-1 px-0 md:px-10 lg:px-20 flex flex-col md:gap-10 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-full h-60 bg-gray-200 rounded-xl" />
        ))}
      </main>
    );

  return (
    <main className="w-full flex-1 px-0 md:px-10 lg:px-20 pb-10 flex flex-col items-center md:gap-10">
      {products.map((product: ProductType, i: number) => (
        <NewProduct key={product.id} reverse={i % 2 === 1} product={product} />
      ))}
    </main>
  );
}

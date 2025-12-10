'use client'
import NewProduct from "@/components/NewProduct";
import { RootState } from "@/store/store";
import { ProductType } from "@/types/ProductType";
import { useSelector } from "react-redux";

export default function NewsPage() {
  const products = useSelector((s: RootState) => s.adminProducts.products);
  const slicedProduct = products.slice(4, 7)
  
  return (
    <main className="w-full min-h-full h-max px-0 md:px-10 lg:px-20 flex flex-col md:gap-10">
      {slicedProduct.map((product: ProductType, i: number) => (
        <NewProduct 
          key={product.id} 
          reverse={i % 2 === 1} 
          product={product}
        />
      ))}
    </main>
  );
}

'use client'

import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ProductType } from "@/types/ProductType";
import Card from "./Card";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import productJson from "@/data/products.json"
import { useFilterList } from "@/lib/product";

type Props = {
  title: string,
  brand?: string,
  onlySale?: boolean,
  isNew?: boolean,
  gender?: string
}

export default function List({
  title, 
  brand = "all", 
  onlySale = false, 
  isNew = false,
  gender = "Unisex"
  }: Props){
  const [currentPage, setCurrentPage] = useState(0);
  const products: ProductType[] = useFilterList({brand, onlySale, isNew, gender});
  const isExtraLargeDevice = useMediaQuery("only screen and (min-width : 1280px)");
  const itemsPerPage =  isExtraLargeDevice ? 5 : 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const windowSize = 5;
  const start = Math.max(0, currentPage - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize);
  const adjustedStart = Math.max(0, end - windowSize);

  function nextPage() {setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));}
  function prevPage() {setCurrentPage(prev => Math.max(prev - 1, 0));}



  return(
    <section className="flex flex-col gap-5 md:gap-10 py-5 px-6 md:px-0 items-center">
      <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">{title}</h2>
      <div className="w-full h-max grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2 lg:grid-rows-1 gap-2.5 md:gap-4 lg:gap-8">
        {visibleProducts.map((product) => 
        <Card
        key={product.id} 
        product={product}
        />)
        }
      </div>
      
      <div className="flex flex-row gap-5 text-base text-gray-700 *:cursor-pointer *:w-5 *:h-5 *:flex *:items-center *:justify-center">
        <button onClick={prevPage}>
          <FaArrowLeft/>
        </button>
          {
            Array.from({ length: end - adjustedStart }).map((_, index) => {
              const pageIndex = adjustedStart + index;

              return (
                <p
                  key={pageIndex}
                  onClick={() => setCurrentPage(pageIndex)}
                  className={pageIndex === currentPage ? "border rounded-full" : ""}
                >
                  {pageIndex + 1}
                </p>
              );
            })
          }
        <button onClick={nextPage}>
          <FaArrowRight/>
        </button>
      </div>
    </section>
  )
}
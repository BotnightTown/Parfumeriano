'use client'

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation"
import { formatPrice, getProductById } from "@/lib/product";
import Image from "next/image"
import { ProductType } from "@/types/ProductType";
import { useCurrency } from "@/context/CurrencyContext";

export default function ProductPage(){
  const params = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("/default_image.jpg");
  const { currency } = useCurrency();
  useEffect(() => {
    const data = getProductById(Number(params.productId))
    if(!data){
      notFound();
    }
    setProduct(data);
  }, [params.productId])

  useEffect(() => {
    if (product?.images.main) {
      setSelectedImage(product.images.main);
    }
  }, [product]);
  return(
    <main className="w-full min-h-full h-max px-0 md:px-10 lg:px-20 flex flex-col md:gap-10">
      <section className="w-full h-max md:h-[345px] flex flex-col md:grid md:grid-cols-2 items-center gap-2.5">
        <div className="w-full h-max flex flex-col gap-2.5">
          <div className="w-full h-[230px] md:h-[250px] flex justify-center">
            <Image
              src={selectedImage}
              alt={product?.name ?? "No image"}
              width={350}
              height={350}
              className="object-fit w-max h-full"
            />
          </div>
          <div className="w-full h-20 px-6 py-3 md:px-8 md:py-3 grid grid-cols-5 gap-1 *:cursor-pointer">
            <div className="w-15 h-15 flex justify-center">
              <Image
                src={product?.images.main ?? "/images/default_image.jpg"}
                alt={product?.name ?? "No image"}
                width={350}
                height={350}
                className="object-fit w-max h-full"
                onClick={() => setSelectedImage(product?.images.main ?? "/images/default_image.jpg")}
              />
            </div>
            {
              product?.images.list?.map((image, index) => (
                <div key={index} className="w-15 h-15 flex justify-center">
                  <Image
                    src={image ?? "/images/default_image.jpg"}
                    alt={product.name}
                    width={350}
                    height={350}
                    className="object-fit w-max h-full"
                    onClick={() => setSelectedImage(image)}
                  />
                </div>
              ))
            }
          </div>
        </div>

        <div className="w-[315px] h-max flex flex-col gap-2.5">
          <div className="w-full h-max flex flex-col gap-1 items-center md:items-start">
            <p className="text-xs md:text-sm text-gray-700">{product?.brand}</p>
            <p className="text-xl md:text-2xl">{product?.name}</p>
            <p className="text-xs md:text-sm text-gray-700">{product?.attributes?.type}</p>
          </div>
          <div className="w-full h-max flex flex-row gap-2 items-end">
            {product?.price.sale && product?.price.sale < product?.price.normal ? (
              <>
                <p className="text-base md:text-xl font-semibold text-red-600">{formatPrice(Number(product?.price.sale), currency)}</p>
                <p className="text-sm md:text-base font-normal text-gray-600 line-through">{formatPrice(Number(product?.price.normal), currency)}</p>
              </>
            ) : (
                <p className="text-base md:text-xl font-semibold">{formatPrice(Number(product?.price.normal), currency)}</p>
            )}
          </div>
          <div className="relative inline-block">
            <select className="w-full h-9 px-4 pr-8 rounded-sm border border-gray-500 text-sm appearance-none cursor-pointer">
              {product?.capacity.map((capacity, index)=>(
                <option value={capacity} key={index}>{capacity}ml</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <button
          className="w-full h-9 flex items-center justify-center bg-black text-white font-medium text-sm rounded-sm cursor-pointer"
          >
            Купити
          </button>
        </div>
      </section>

      <section className="w-full max py-5 flex flex-row gap-2.5 md:gap-15 lg:gap-25 justify-center md:border border-gray-300 rounded-xl">
        <div className="w-max h-full flex flex-col gap-4 p-4 text-sm lg:text-base *:cursor-pointer">
          <p>Характеристики</p>
          <p className="text-gray-600">Опис</p>
          <p className="text-gray-600">Склад</p>
        </div>
        <ul className="w-max h-max py-4 flex flex-col gap-1 text-sm lg:text-base">
          <li><span className="font-semibold">Прем'єра аромату:</span> {product?.year}</li>
          <li><span className="font-semibold">Бренд:</span> {product?.brand}</li>
          <li><span className="font-semibold">Група товару:</span> {product?.attributes?.type}</li>
          <li><span className="font-semibold">Об'єм:</span> {product?.capacity.join("ml, ") + "ml"}</li>
          <li><span className="font-semibold">Стать:</span> {product?.attributes?.gender}</li>
          <li><span className="font-semibold">Класифікація:</span> {product?.attributes?.classification}</li>
          <li><span className="font-semibold">Тип аромату:</span> {product?.attributes?.aroma}</li>
        </ul>
      </section>
    </main>
  )
}
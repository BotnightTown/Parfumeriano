import { ProductType } from "@/types/ProductType";
import Image from "next/image"
import Link from "next/link";

export default function ListCard({ product }: { product: ProductType }){
  return(
    <div className="w-full lg:w-55 h-[260px] md:h-75 lg:h-[370px] p-2 md:p-3 border border-[#CCCCCC] rounded-xl flex flex-col gap-2 md:gap-3">
      <div className="w-full h-[130px] md:h-40 lg:h-50 flex justify-center">
        <Image
          src={product.images.main}
          alt={product.name}
          width={300}
          height={300}
          className="object-fit w-max h-full rounded-lg"
        />
      </div>
      <div className="w-full h-full flex flex-col md:gap-2">
        <div className="w-full h-full flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-sm md:text-base">{product.name}</h3>
            <h6 className="font-normal text-[10px] md:text-xs text-[#333333]">{product.attributes?.type}</h6>
          </div>
          <div className="flex flex-row gap-2 items-end">
            {product.price.sale && product.price.sale < product.price.normal ? (
              <>
                <p className="text-sm md:text-base lg:text-lg text-red-600 font-semibold md:font-bold">
                  ₴{product.price.sale}
                </p>
                <p className="text-[10px] md:text-xs lg:text-sm text-gray-600 font-normal line-through">
                  ₴{product.price.normal}
                </p>
              </>
            ) : (
              <p className="text-sm md:text-base lg:text-lg font-semibold md:font-bold">
                ₴{product.price.normal}
              </p>
            )}
          </div>
        </div>
        <Link href={`/product/${product.id}`} className="w-full h-max py-1.5 rounded-sm text-center bg-black text-white text-[10px] md:text-xs cursor-pointer">
          Перейти до товару
        </Link>
      </div>
    </div>
  )
}
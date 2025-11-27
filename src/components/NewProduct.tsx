import Image from "next/image"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"

export default function NewProduct({ reverse, product }: { reverse?: boolean, product: ProductType }) {
  return (
    <article
      className={
        "w-full md:h-[250px] lg:h-[300px] p-5 md:p-0 flex flex-col gap-3 md:gap-[30px] lg:gap-[50px] " +
        (reverse ? "md:flex-row-reverse" : "md:flex-row")
      }
    >
      <div className="w-full md:w-[260px] lg h-70 md:h-[250px] lg:h-[300px] flex justify-center">
        <Image
          src={product.images.main}
          alt={product.name}
          width={500}
          height={500}
          className="object-fit w-max h-full rounded-lg"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold lg:text-3xl">{product.name}</h3>
          <h5 className="text-sm">{product.brand}</h5>
        </div>
        <p className="lg:text-xl">
          {product.description}
        </p>
        <div className="flex flex-row gap-2.5 lg:text-xl">
          <p>{product.attributes?.gender}</p>
          <p className="text-xl">•</p>
          <p>{product.attributes?.aroma}</p>
          <p className="text-xl">•</p>
          <p>{product.attributes?.stability} stability</p>
        </div>
        <Link href={`/product/${product.id}`} className="w-max h-max py-2 px-6 rounded-sm text-center bg-black text-white text-xs md:text-sm lg:text-base cursor-pointer">
          Перейти до товару
        </Link>
      </div>
    </article>
  )
}
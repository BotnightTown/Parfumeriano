import Image from "next/image"
import { CarouselType } from "@/types/CarouselType"

interface CarouselItemProps extends CarouselType {
  index: number;
  currentSlide: number;
}

export default function CarouselItem({ imageSrc, index, currentSlide }: CarouselItemProps) {
  return (
    <div className={`absolute w-full h-full transition-opacity duration-1500 ${
      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
    }`}>
      <Image 
        src={imageSrc} 
        alt={imageSrc} 
        fill 
        className="object-cover" 
      />
    </div>
  )
}

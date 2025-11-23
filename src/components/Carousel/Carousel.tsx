'use client'

import { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";
import { CarouselType } from "@/types/CarouselType";
import carouselJson from "@/data/carousel.json"

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Carousel(){
  const [slides, setSlides] = useState<CarouselType[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carousel: CarouselType[] = carouselJson;
  useEffect(() => {
    setSlides(carousel);
  }, []);

  function increase(){
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  }

  function decrease(){
    setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    const interval = setInterval(increase, 13500);
    return () => clearInterval(interval);
  }, [slides]);

  return(
    <article className="relative w-full h-50 md:h-100">
      <>
      {
        slides.map((slide, index) => (
          <CarouselItem 
            key={index} 
            imageSrc={slide.imageSrc} 
            description={slide.description} 
            index={index} 
            currentSlide={currentSlide}
          />
        ))
      }
      </>
      <div className="relative z-20 h-full px-2 md:p-8 py-7 md:py-15 flex flex-row justify-center md:justify-between items-start text-xs md:text-lg lg:text-xl font-semibold text-white">
        <p className="cursor-pointer hidden md:flex justify-center items-center md:max-w-20 md:w-full h-full" onClick={decrease}><FaArrowLeft /></p>
        <p className="h-max">{slides[currentSlide]?.description}</p>
        <p className="cursor-pointer hidden md:flex justify-center items-center md:max-w-20 md:w-full h-full" onClick={increase}><FaArrowRight /></p>
      </div>
    </article>
  )
}
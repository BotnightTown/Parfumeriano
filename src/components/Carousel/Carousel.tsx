"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CarouselType } from "@/types/CarouselType";
import carouselJson from "@/data/carousel.json";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

import {
  FaChevronRight,
  FaChevronCircleRight,
  FaChevronLeft,
} from "react-icons/fa";
import CarouselSkeleton from "../Checkout/CarouselSkeleton";

export default function Carousel() {
  const [slides, setSlides] = useState<CarouselType[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carousel: CarouselType[] = carouselJson;
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    setSlides(carousel);
  }, []);

  function increase() {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }

  function decrease() {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    const interval = setInterval(increase, 13500);
    return () => clearInterval(interval);
  }, [slides]);

  const descriptionTranslate: Record<string, string> = {
    "Легка нотка кремового аромату доповнить твій образ!": t.description1,
    "М'який і ніжний аромат створює відчуття тепла та затишку.": t.description2,
    "Ідеальний баланс солодких і фруктових нот для щоденного настрою.":
      t.description3,
  };

  if (slides.length === 0) return <CarouselSkeleton />;

  return (
    <article className="relative w-full h-60 md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.description}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-16 pb-8 md:pb-12 gap-4">
        <p className="text-white text-base md:text-2xl lg:text-3xl font-semibold max-w-xl leading-snug drop-shadow">
          {descriptionTranslate[slides[currentSlide]?.description]}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={decrease}
            className="w-9 h-9 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={increase}
            className="w-9 h-9 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </article>
  );
}

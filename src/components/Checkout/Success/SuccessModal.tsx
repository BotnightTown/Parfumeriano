"use client"

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { clearCartItems } from "@/store/slices/cartSlice";
import { setCity, setDeliveryMethod, setDeliveryWay, setPaymentMethod } from "@/store/slices/checkoutSlice";
import { useEffect } from "react"
import { useDispatch } from "react-redux";

export default function SuccessModal(){
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    dispatch(setCity("Миколаїв"))
    dispatch(setDeliveryMethod("courier"))
    dispatch(setDeliveryWay("our_shop"))
    dispatch(setPaymentMethod("google_pay"))
    dispatch(clearCartItems())
  }, []);

  return (
    <div
      className={`absolute right-1/2 top-1/2 md:top-1/2 -translate-y-1/2 translate-x-1/2
        w-[85%] md:w-150 h-60 p-4 rounded-[10px]
        bg-white transition-transform duration-500
        flex gap-5 items-center justify-center
        text-xl
        `}
    >
    {t.congrats}
    </div>
  )
}
'use client'
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { convertPrice, formatPrice } from "@/lib/product";
import { translations } from "@/lib/translations";
import { CartItemType } from "@/store/slices/cartSlice";
import { setCheckoutStep } from "@/store/slices/uiSlice";
import { RootState } from "@/store/store";
import { RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function OrderModal(){
  const dispatch = useDispatch();
  const { currency } = useCurrency();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { city, deliveryMethod, paymentMethod } = useSelector((state: RootState) => state.checkout)
  const { language } = useLanguage();
  const t = translations[language];

  const totalPrice = cartItems.reduce((sum: number, item: CartItemType) => sum + (item.price.sale ? item.price.sale : item.price.normal) * item.quantity, 0);
  
  return(
    <div
      className={`absolute right-1/2 top-1/2 md:top-1/2 -translate-y-1/2 translate-x-1/2
        w-[85%] md:w-150 p-4 rounded-[10px]
        bg-white transition-transform duration-500
        flex flex-col gap-5
        `}
    >
      <div className="w-full flex justify-center">
        <button 
          onClick={() => dispatch(setCheckoutStep("cart"))} 
          className="w-8 h-8 text-2xl cursor-pointer absolute left-4 top-4 flex items-center justify-center"
        >
          <RiArrowLeftLine />
        </button>
        <p className="font-semibold text-xl md:text-2xl">{t.placeAnOrder}</p>
      </div>
      <div className="w-full h-max flex flex-col gap-3">
        <div className="w-full h-max p-4 flex flex-col items-end gap-2.5 rounded-lg border border-gray-400">
          <p className="w-full text-sm font-medium text-gray-700">{t.delivery}</p>
          <div className="w-full text-sm font-medium text-gray-700">{ city }, {deliveryMethod === "courier" ? `${t.courier}` : deliveryMethod === "self" ? "адреса нашого магазину" : "адреса нової пошти"}</div>
          <button 
            className="w-max cursor-pointer font-medium"
            onClick={() => dispatch(setCheckoutStep("delivery"))}
          >
            {t.change}
          </button>
        </div>
        <div className="w-full h-max p-4 flex flex-col items-end gap-2.5 rounded-lg border border-gray-400">
          <p className="w-full text-sm font-medium text-gray-700">{t.payment}</p>
          <div className="w-full text-sm font-medium text-gray-700">{paymentMethod === "receiving" ? `${t.paymentUponReceiptOfGoods}` : paymentMethod === "google_pay" ? "Google pay" : `${t.cashlessForIndividuals}` }</div>
          <button 
            className="w-max cursor-pointer font-medium"
            onClick={() => dispatch(setCheckoutStep("payment"))}
          >
            {t.change}
          </button>
        </div>
        <div className="w-full flex flex-row justify-between">
          <p className="font-semibold text-base md:text-xl">{t.sum}</p>
          <p className="font-semibold text-lg md:text-xl">{formatPrice(convertPrice(totalPrice, currency), currency)}</p>
        </div>
        <div className="w-full h-max flex flex-row gap-2">
          <button 
          type="submit"
          className="w-full h-max md:h-[50px] p-1 md:p-4 text-sm md:text-base font-medium border rounded-lg flex items-center justify-center cursor-pointer text-white bg-black"
          onClick={() => dispatch(setCheckoutStep("success"))}
          >
            {t.pay}
          </button>
        </div>
      </div>
    </div>
  )
}
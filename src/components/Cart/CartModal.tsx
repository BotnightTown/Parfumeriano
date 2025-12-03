"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeCart } from "@/store/slices/uiSlice";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { RiCloseFill } from "react-icons/ri";
import { convertPrice, formatPrice } from "@/lib/product";
import CartItem from "./CartItem";
import { CartItemType } from "@/store/slices/cartSlice";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartModal() {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state: RootState) => state.ui);
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { currency } = useCurrency();

  const totalPrice = cartItems.reduce((sum: number, item: CartItemType) => sum + (item.price.sale ? item.price.sale : item.price.normal) * item.quantity, 0);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div className={`fixed inset-0 z-1000 transition-all ${isCartOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div
        onClick={() => dispatch(closeCart())}
        className="absolute inset-0 bg-black/50"
      />
      <div
        className={`absolute right-1/2 top-1/2 md:top-1/2 -translate-y-1/2 translate-x-1/2
          w-[85%] md:w-150 p-4 rounded-[10px]
          bg-white transition-transform duration-500
          flex flex-col gap-5
          `}
      >
        <div className="w-full flex justify-center">
          <button 
            onClick={() => dispatch(closeCart())} 
            className="w-8 h-8 text-2xl cursor-pointer absolute right-4 top-4 flex items-center justify-center"
          >
            <RiCloseFill />
          </button>
          <p className="font-semibold text-xl md:text-2xl">Кошик</p>
        </div>
        <div className="w-full h-max flex flex-col gap-3">
          <div className="w-full h-max max-h-102 overflow-y-scroll flex flex-col gap-3">
            {
              cartItems.length !== 0 ? (
                cartItems.map((item: CartItemType) => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                  />
                ))
              ):(
                <div className="text-center py-10 text-gray-500">
                  Кошик порожній
                </div>
              )
            }

          </div>
          <div className="w-full flex flex-row justify-between">
            <p className="font-semibold text-base md:text-xl">Разом</p>
            <p className="font-semibold text-lg md:text-xl">{formatPrice(convertPrice(totalPrice, currency), currency)}</p>
          </div>
          <div className="w-full h-max flex flex-row gap-2">
            <button 
            type="button"
            className="w-full h-max md:h-[50px] p-1 md:p-4 text-sm md:text-base font-medium border rounded-lg cursor-pointer flex items-center justify-center"
            onClick={()=> dispatch(closeCart())}
            >
              Продовжити покупки
            </button>
            <button 
            type="button"
            className={`w-full h-max md:h-[50px] p-1 md:p-4 text-sm md:text-base font-medium border rounded-lg flex items-center justify-center ${cartItems.length !== 0 ? "cursor-pointer text-white bg-black" : "cursor-default bg-gray-300 text-gray-400 border-gray-300"}`}
            disabled={cartItems.length !== 0}
            >
              Перейти до оплати
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeCart } from "@/store/uiSlice";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function CartModal() {
  const { isCartOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // блокування скролу фону
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";
  }, [isCartOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-1000 transition-all ${
        isCartOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        onClick={() => dispatch(closeCart())}
        className="absolute inset-0 bg-black/50"
      />
      <div
        className={`absolute right-0 top-0 h-full w-[75%] bg-white transition-transform duration-500 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={() => dispatch(closeCart())} className="p-3 text-xl">
          ✕
        </button>
        <p className="p-5 text-lg">Ваш кошик</p>
      </div>
    </div>,
    document.body
  );
}

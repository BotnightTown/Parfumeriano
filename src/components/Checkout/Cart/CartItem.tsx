import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { convertPrice, formatPrice } from "@/lib/product"
import Image from "next/image"
import { FiMinus, FiPlus } from "react-icons/fi";
import { CartItemType, updateQuantityInCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import ConfirmModal from "../ConfirmModal"

export default function CartItem({ item }: { item: CartItemType}){
  const { currency } = useCurrency();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  
  function increase(){
    dispatch(updateQuantityInCart({ id: item.id, quantity: item.quantity + 1 }))
  }

  function decrease() {
    if (item.quantity === 1) {
      setShowConfirm(true);
      return;
    }

    dispatch(updateQuantityInCart({ 
      id: item.id, 
      quantity: item.quantity - 1 
    }));
  }

  function confirmDelete() {
    dispatch(updateQuantityInCart({ 
      id: item.id, 
      quantity: 0 
    }));
    setShowConfirm(false);
  }

  function cancelDelete() {
    setShowConfirm(false);
  }


  return(
    <div className="w-full h-max flex flex-row gap-2 md:gap-4">
      <div className="w-20 md:w-32 h-20 md:h-32 relative shrink-0 flex justify-center items-center">
        <Image
        src={item.images.main}
        alt={item.name}
        width={300}
        height={300}
        className="w-max h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="w-full h-max">
          <p className="font-base text-base md:text-xl">
            {item.name}
          </p>
          <p className="font-light text-xs md:text-sm">
            {item.attributes?.type}
          </p>
        </div>
        <div className="w-full flex flex-row justify-between items-end">
          <p className="font-medium text-sm md:text-lg lg:text-[20px]">
            {formatPrice(convertPrice((item.price.sale ? item.price.sale : item.price.normal), currency), currency)}
          </p>
          
          <div className="w-max h-6 md:h-8 px-2 md:px-3 border rounded-xl md:rounded-[20px] flex flex-row items-center gap-2 md:gap-3">
            <button 
              className="w-3 md:w-6 h-3 md:h-6 md:text-xl cursor-pointer flex items-center justify-center"
              onClick={decrease}
            >              
              <FiMinus />
            </button>
            <p className="text-[20px]">{item.quantity}</p>
            <button 
              className="w-3 md:w-6 h-3 md:h-6 md:text-xl cursor-pointer flex items-center justify-center"
              onClick={increase}
            >              
              <FiPlus />
            </button>
          </div>

          {showConfirm && (
            <ConfirmModal
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}

        </div>
      </div>
    </div>
  )
}
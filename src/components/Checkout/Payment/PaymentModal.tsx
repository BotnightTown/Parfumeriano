import { setPaymentMethod } from "@/store/slices/checkoutSlice";
import { setCheckoutStep } from "@/store/slices/uiSlice";
import { RootState } from "@/store/store";
import { RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentModal(){
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state: RootState) => state.checkout)
  
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
          onClick={() => dispatch(setCheckoutStep("order"))} 
          className="w-8 h-8 text-2xl cursor-pointer absolute left-4 top-4 flex items-center justify-center"
        >
          <RiArrowLeftLine />
        </button>
        <p className="font-semibold text-xl md:text-2xl">Вибір способу оплати</p>
      </div>
      <div className="w-full h-max flex flex-col gap-3 text-sm md:text-base">
        <div
          onClick={() => dispatch(setPaymentMethod("receiving"))}
          className="w-max flex flex-row gap-3 cursor-pointer select-none"
        >
          <input
            type="radio"
            name="way"
            value="receiving"
            checked={paymentMethod === "receiving"}
            readOnly
          />
          <span>Оплата під час отримання товару</span>
        </div>
        <div
          onClick={() => dispatch(setPaymentMethod("google_pay"))}
          className="w-max flex flex-row gap-3 cursor-pointer select-none"
        >
          <input
            type="radio"
            name="way"
            value="google_pay"
            checked={paymentMethod === "google_pay"}
            readOnly
          />
          <span>Google pay</span>
        </div>
        <div
          onClick={() => dispatch(setPaymentMethod("cash"))}
          className="w-max flex flex-row gap-3 cursor-pointer select-none"
        >
          <input
            type="radio"
            name="way"
            value="cash"
            checked={paymentMethod === "cash"}
            readOnly
          />
          <span>Безготівковий для фізичних осіб</span>
        </div>
      </div>
      <button 
      type="submit"
      className="w-full h-max md:h-[50px] p-1 md:p-4 text-sm md:text-base font-medium border rounded-lg flex items-center justify-center cursor-pointer text-white bg-black"
      onClick={() => dispatch(setCheckoutStep("order"))}
      >
        Вибрати
      </button>
    </div>
  )
}
import { setCity, setDeliveryMethod, setDeliveryWay } from "@/store/slices/checkoutSlice";
import { setCheckoutStep } from "@/store/slices/uiSlice";
import { RootState } from "@/store/store";
import { RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function DeliveryModal(){
  const dispatch = useDispatch();
  const { city, deliveryMethod, deliveryWay } = useSelector((state: RootState) => state.checkout)

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
        <p className="font-semibold text-xl md:text-2xl">Вибір способу доставки</p>
      </div>
      <div className="w-full h-max flex flex-col gap-3">
        <div className="relative inline-block">
          <select 
            className="w-full px-4 pr-8 py-2 rounded-md border border-gray-500 text-sm md:text-base appearance-none cursor-pointer"
            value={city}
            onChange={(e) => dispatch(setCity(e.target.value))}
          >
            <option value="Київ">Київ</option>
            <option value="Миколаїв">Миколаїв</option>
            <option value="Одеса">Одеса</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="w-full h-max flex flex-col gap-3 text-sm md:text-base">
          <p className="font-medium">Метод доставки</p>
          <div
            onClick={() => dispatch(setDeliveryMethod("self"))}
            className="w-max flex flex-row gap-3 cursor-pointer select-none"
          >
            <input
              type="radio"
              name="method"
              value="self"
              checked={deliveryMethod === "self"}
              readOnly
            />
            <span>Самовивіз</span>
          </div>
          <div
            onClick={() => dispatch(setDeliveryMethod("courier"))}
            className="w-max flex flex-row gap-3 cursor-pointer select-none"
          >
            <input
              type="radio"
              name="method"
              value="courier"
              checked={deliveryMethod === "courier"}
              readOnly
            />
            <span>Кур'єрська доставка</span>
          </div>
        </div>
        {
          deliveryMethod !== "courier" && 
          <div className="w-full h-max flex flex-col gap-3 text-sm md:text-base">
            <p className="font-medium">Спосіб доставки</p>
            <div
              onClick={() => dispatch(setDeliveryWay("our_shop"))}
              className="w-max flex flex-row gap-3 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="way"
                value="our_shop"
                checked={deliveryWay === "our_shop"}
                readOnly
              />
              <span>Самовивіз з наших магазинів</span>
            </div>
            <div
              onClick={() => dispatch(setDeliveryWay("nova_post"))}
              className="w-max flex flex-row gap-3 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="way"
                value="nova_post"
                checked={deliveryWay === "nova_post"}
                readOnly
              />
              <span>Самовивіз з нової пошти</span>
            </div>
          </div>
        }
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
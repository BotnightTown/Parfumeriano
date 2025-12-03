import { openCart } from "@/store/slices/uiSlice";
import { RootState } from "@/store/store";
import { RiShoppingBagLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function CartIcon(){
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return(
    <div className="relative" onClick={() => dispatch(openCart())}>
      <RiShoppingBagLine />
      {
        cartItems.length !== 0 ? (
          <div className="w-5 h-5 rounded-full bg-red-600 absolute border-2 border-white -top-2 -right-2 text-white text-xs font-semibold flex items-center justify-center">{cartItems.length}</div>
        ) : (
          <></>
        )
      }
    </div>
  )
}
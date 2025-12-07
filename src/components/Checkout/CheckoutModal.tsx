import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/slices/uiSlice";
import { createPortal } from "react-dom";

import CartModal from "./Cart/CartModal";
import OrderModal from "./Order/OrderModal";
import DeliveryModal from "./Delivery/DeliveryModal";
import PaymentModal from "./Payment/PaymentModal";
import SuccessModal from "./Success/SuccessModal";

export default function CheckoutModal() {
  const dispatch = useDispatch();
  const { isModalOpen, checkoutStep } = useSelector((state: RootState) => state.ui);

  /* const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; 
  
  я не знаю шо робить цей код, залишу поки
  */

  if (!isModalOpen) return null;

  return createPortal(
    <div className={`fixed inset-0 z-1000 transition-all ${isModalOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div
        onClick={() => dispatch(closeModal())}
        className="absolute inset-0 bg-black/50"
      />
      {checkoutStep === 'cart' && <CartModal />}
      {checkoutStep === 'order' && <OrderModal />}
      {checkoutStep === 'delivery' && <DeliveryModal />}
      {checkoutStep === 'payment' && <PaymentModal />}
      {checkoutStep === 'success' && <SuccessModal />}
    </div>,
    document.body
  );
}

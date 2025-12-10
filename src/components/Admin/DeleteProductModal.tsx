'use client'
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { deleteProduct } from "@/store/slices/adminProductSlice";
import { ProductType } from "@/types/ProductType";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type DeleteProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductType | null;
}


export default function DeleteProductModal({isModalOpen, setIsModalOpen, product}: DeleteProductModalProps ){
  const dispatch = useDispatch();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  function submitDelete() {
    router.replace("/");

    setTimeout(() => {
      dispatch(deleteProduct(product?.id));
    }, 50);
  }

  return(
    <div className={`fixed inset-0 z-1000 transition-all ${isModalOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-black/50"
      />
      <div
        className={`absolute right-1/2 top-1/2 md:top-1/2 -translate-y-1/2 translate-x-1/2
          w-[85%] md:w-150 p-4 rounded-[10px]
          bg-white transition-transform duration-500
          flex flex-col gap-5
          `}
      >
        <div className="w-full flex flex-col items-center gap-3 justify-center">
          <p className="font-medium text-base md:text-xl">{t.wantDeleteProduct}?</p>
          <div className="w-full h-max flex flex-row gap-2">
            <button 
            type="button"
            className="w-full h-max md:h-[50px] p-1 md:p-4 text-sm md:text-base font-medium border rounded-lg cursor-pointer flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
            >
              {t.cancel}
            </button>
            <button 
            type="submit"
            className="w-full h-max md:h-[50px] p-1 md:p-4 text-sm md:text-base font-medium border rounded-lg flex items-center justify-center cursor-pointer text-white bg-black"
            onClick={submitDelete}
            >
              {t.delete}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
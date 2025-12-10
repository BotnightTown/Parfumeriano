"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg p-5 w-[300px] flex flex-col gap-4">
      <p className="text-center text-lg">
        {t.removeProductFromCart}
      </p>

      <div className="flex gap-3">
        <button 
          className="w-full py-2 border rounded cursor-pointer"
          onClick={onCancel}
        >
          {t.cancel}
        </button>

        <button 
          className="w-full py-2 bg-black text-white rounded cursor-pointer"
          onClick={onConfirm}
        >
          {t.delete}
        </button>
      </div>
    </div>
  </div>
  );
}

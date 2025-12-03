"use client";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg p-5 w-[300px] flex flex-col gap-4">
      <p className="text-center text-lg">
        Видалити товар з кошика?
      </p>

      <div className="flex gap-3">
        <button 
          className="w-full py-2 border rounded cursor-pointer"
          onClick={onCancel}
        >
          Скасувати
        </button>

        <button 
          className="w-full py-2 bg-black text-white rounded cursor-pointer"
          onClick={onConfirm}
        >
          Видалити
        </button>
      </div>
    </div>
  </div>
  );
}

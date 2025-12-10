"use client";

import AddProductModal from "@/components/Admin/AddProductModal";
import { useCurrency } from "@/context/CurrencyContext"
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { loginAdmin, logoutAdmin } from "@/store/slices/adminSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function SettingsPage(){
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage } = useLanguage();
  const isAdmin = useSelector((s: RootState) => s.admin.isAdmin)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const t = translations[language];

  const handleAdminLogin = () => {
    const password = prompt(`${t.inputAdminPassword}`);
    if (password === ADMIN_PASSWORD) {
      dispatch(loginAdmin());
      localStorage.setItem("isAdmin", JSON.stringify(true));
      alert(`${t.adminModeEnabled}`)
    } else {
      alert(`${t.wrongPassword}`);
    }
  };

  const handleAdminLogout = () => {
    dispatch(logoutAdmin())
      localStorage.setItem("isAdmin", JSON.stringify(false));
    alert(`${t.adminModeDisabled}`)
  }

  return(
    <main className="w-full min-h-screen h-max p-2.5 md:px-10 lg:px-20 flex flex-col gap-5 md:gap-10">
      <h1 className="font-semibold text-2xl md:text-3xl">{t.settings}</h1>
      <div className="border border-gray-800"/>
      <div className="w-[350px] h-max flex flex-col gap-2.5">
        <h2 className="font-medium md:text-xl">{t.languageAndRegion}</h2>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm md:text-base">{t.language}: </p>
          <div className="relative inline-block">
            <select 
            className="px-4 pr-8 py-2 rounded-md border border-gray-500 text-sm md:text-base appearance-none cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            >
              <option value="uk">Українська</option>
              <option value="en">English</option>
              <option value="br">⠃⠗⠇</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm md:text-base">{t.currency}: </p>
          <div className="relative inline-block">
            <select 
            className="px-4 pr-8 py-2 rounded-md border border-gray-500 text-sm md:text-base appearance-none cursor-pointer"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-[350px] h-max flex flex-col gap-2.5">
        <h2 className="font-medium">{t.appearance}</h2>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm md:text-base">{t.darkTheme}</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              value=""
              // onChange={(e) => console.log(e.target.checked)}
            />

            <div
              className="
                group peer
                bg-white rounded-full duration-300
                w-12 h-6
                md:w-16 md:h-8
                ring-2 ring-gray-400

                after:content-[''] after:absolute after:rounded-full after:bg-gray-400
                after:duration-300 after:h-5 after:w-5 after:top-0.5 after:left-0.5
                md:after:h-6 md:after:w-6 md:after:top-1 md:after:left-1

                peer-checked:ring-black
                peer-checked:after:bg-black
                peer-checked:after:translate-x-6
                md:peer-checked:after:translate-x-8
              "
            ></div>
          </label>
        </div>
      </div> */}
      {
        isAdmin ? (
          <div className="flex flex-col gap-5">
            <button
              onClick={handleAdminLogout}
              className="w-max border-2 px-4 py-2 rounded-md bg-white text-black font-semibold cursor-pointer"
            >
              {t.disableAdminMode}
            </button>
            <button
              onClick={()=>setIsAddModalOpen(true)}
              className="w-max border px-4 py-2 rounded-md bg-black text-white cursor-pointer"
            >
              {t.addNewProduct}
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdminLogin}
            className="w-max border px-4 py-2 rounded-md bg-black text-white cursor-pointer"
          >
            {t.enterAdminMode}
          </button>
        )
      }

      {
        isAddModalOpen && isAdmin && 
        <AddProductModal 
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        />
      }
    </main>
  )
}
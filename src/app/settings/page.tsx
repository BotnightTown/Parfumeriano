"use client";

import { useCurrency } from "@/context/CurrencyContext"

export default function SettingsPage(){
  const { currency, setCurrency } = useCurrency();

  return(
    <main className="w-full min-h-full h-max p-2.5 md:px-10 lg:px-20 flex flex-col gap-5 md:gap-10">
      <h1 className="font-semibold text-2xl md:text-3xl">Налаштування</h1>
      <div className="border border-gray-800"/>
      <div className="w-[350px] h-max flex flex-col gap-2.5">
        <h2 className="font-medium md:text-xl">Мова та регіон</h2>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm md:text-base">Мова інтерфейсу: </p>
          <div className="relative inline-block">
            <select className="px-4 pr-8 py-2 rounded-md border border-gray-500 text-sm md:text-base appearance-none cursor-pointer">
              <option value="ukr">Українська</option>
              <option value="eng">Англійська</option>
              <option value="braille">Шрифт Брайля</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm md:text-base">Валюта: </p>
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
      <div className="w-[350px] h-max flex flex-col gap-2.5">
        <h2 className="font-medium">Зовнішній вигляд</h2>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm md:text-base">Світла / темна тема</p>
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
      </div>
    </main>
  )
}
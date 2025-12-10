"use client";

import Link from "next/link";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { openModal, toggleMobileMenu } from "@/store/slices/uiSlice";
import { RootState } from "@/store/store";
import { NavLink } from "./ui/NavLink";

import { RiCloseFill } from "react-icons/ri";
import { GoGear } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import CartIcon from "./ui/CartIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

function Desktop(){
  const { language } = useLanguage();
  const t = translations[language];

  return(
    <header className="w-full h-14 my-5 px-10 lg:px-20 grid grid-cols-3 items-center">
      <Link href="/" className="w-max h-max flex gap-2 flex-row items-center cursor-pointer">
        <img 
          src="/images/logo/Logo Dark.svg" 
          alt="Parfumeriano logo"
          className="w-[26px] h-8"
        />
        <p className="text-xl font-medium">Parfumeriano</p>
      </Link>
      <nav className="flex flex-row gap-8 justify-center text-base font-medium *:cursor-pointer">
        <NavLink href="/">{t.main}</NavLink>
        <NavLink href="/new">{t.new}</NavLink>
        <NavLink href="/sale">{t.sale}</NavLink>
        <NavLink href="/brands">{t.brands}</NavLink>
      </nav>
      <div className="flex justify-end text-3xl gap-2 *:cursor-pointer">
        <CartIcon />
        <Link href={"/settings"} className="relative">
          <GoGear />
        </Link>
      </div>
    </header>
  )
}

function Mobile() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.ui);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="w-full sticky top-0 z-1000 bg-white text-black">
      <div className="w-full h-18 px-7 py-2 flex flex-row justify-between items-center border-b border-gray-200">
        <Link href="/" className="w-[26px] h-8 cursor-pointer">
          <img
            src="/images/logo/Logo Dark.svg"
            alt="Parfumeriano logo"
            className="w-full h-full object-contain"
          />
        </Link>
        <RxHamburgerMenu
          className="w-10 h-10 text-black cursor-pointer"
          onClick={() => dispatch(toggleMobileMenu())}
        />
      </div>

      {isMobileMenuOpen && (
        <div
          onClick={() => dispatch(toggleMobileMenu())}
          className="fixed inset-0 bg-black/40 z-900 transition-opacity duration-300"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-1000 w-[80%] max-w-[320px] h-full bg-white shadow-lg transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-semibold">{t.menu}</p>
          <RiCloseFill className="cursor-pointer text-2xl" onClick={() => dispatch(toggleMobileMenu())}/>
        </div>

        <nav className="flex flex-col gap-4 text-base font-base">
          <Link href="/">{t.main}</Link>
          <Link href="/new">{t.new}</Link>
          <Link href="/sale">{t.sale}</Link>
          <Link href="/brands">{t.brands}</Link>
          <div className="w-full border border-gray-600" />
          <p onClick={() => dispatch(openModal())} className="cursor-pointer">{t.cart}</p>
          <Link href="/settings">{t.settings}</Link>
        </nav>
      </div>
    </header>
  );
}


export default function Header(){
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  
  return isSmallDevice ? <Mobile /> : <Desktop />
}
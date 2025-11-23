"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { openCart, toggleMobileMenu } from "@/store/uiSlice";
import { RootState } from "@/store/store";
import { NavLink } from "./ui/NavLink";

import { RiShoppingBagLine, RiCloseFill } from "react-icons/ri";
import { GoGear } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

function NotificationDot(){
  return <div className="w-2.5 h-2.5 rounded-full bg-red-600 absolute top-1 right-0"></div>
}

function Desktop(){
  const dispatch = useDispatch();

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
        <NavLink href="/">Головна</NavLink>
        <NavLink href="/new">Новинки</NavLink>
        <NavLink href="/sale">Акції</NavLink>
        <NavLink href="/brands">Бренди</NavLink>
      </nav>
      <div className="flex justify-end text-3xl gap-2 *:cursor-pointer">
        <div className="relative" onClick={() => dispatch(openCart())}>
          <RiShoppingBagLine />
          <NotificationDot />
        </div>
        <Link href={"/settings"} className="relative">
          <GoGear />
          <NotificationDot />
        </Link>
      </div>
    </header>
  )
}

function Mobile() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

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
          <p className="text-lg font-semibold">Меню</p>
          <RiCloseFill className="cursor-pointer text-2xl" onClick={() => dispatch(toggleMobileMenu())}/>
        </div>

        <nav className="flex flex-col gap-4 text-base font-base">
          <Link href="/">Головна</Link>
          <Link href="/new">Новинки</Link>
          <Link href="/sale">Акції</Link>
          <Link href="/brands">Бренди</Link>
          <div className="w-full border border-gray-600" />
          <p onClick={() => dispatch(openCart())}>Кошик</p>
          <Link href="/settings">Налаштування</Link>
        </nav>
      </div>
    </header>
  );
}


export default function Header(){
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  
  return isSmallDevice ? <Mobile /> : <Desktop />
}
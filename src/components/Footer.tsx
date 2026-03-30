"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="w-full bg-black text-white">
      <div className="w-full px-6 md:px-10 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-row items-center">
            <img
              src="/images/logo/Logo Light.svg"
              alt="Parfumeriano logo"
              className="w-[26px] h-8"
            />
            <p className="text-lg font-semibold">Parfumeriano</p>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Ваш преміум магазин парфумерії. Обирайте аромати що розкажуть вашу
            історію.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">
            Навігація
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Головна
            </Link>
            <Link href="/new" className="hover:text-white transition-colors">
              Новинки
            </Link>
            <Link href="/sale" className="hover:text-white transition-colors">
              Розпродаж
            </Link>
            <Link href="/brands" className="hover:text-white transition-colors">
              Бренди
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">
            Акаунт
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link
              href="/profile"
              className="hover:text-white transition-colors"
            >
              Мій профіль
            </Link>
            <Link
              href="/settings"
              className="hover:text-white transition-colors"
            >
              Налаштування
            </Link>
            <Link
              href="/profile"
              className="hover:text-white transition-colors"
            >
              Історія замовлень
            </Link>
            {!session && (
              <>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors"
                >
                  Увійти
                </Link>
                <Link
                  href="/register"
                  className="hover:text-white transition-colors"
                >
                  Зареєструватись
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">
            Контакти
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <p>м. Миколаїв</p>
            <p>вул. Євгенія Логінова 19Г</p>
            <Link
              href="mailto:perfumeriano.biz@gmail.com"
              className="hover:text-white transition-colors break-all"
            >
              perfumeriano.biz@gmail.com
            </Link>
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Години роботи
              </p>
              <p>Пн–Пт: 09:00 – 20:00</p>
              <p>Сб–Нд: 10:00 – 18:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 lg:px-20 py-4 border-t border-gray-800 flex flex-wrap gap-4 text-xs text-gray-600">
        {["Chanel", "Dior", "Gucci", "Moschino"].map((brand) => (
          <Link
            key={brand}
            href="/brands"
            className="hover:text-gray-400 transition-colors uppercase tracking-widest"
          >
            {brand}
          </Link>
        ))}
      </div>

      <div className="w-full px-6 md:px-10 lg:px-20 py-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Parfumeriano. Всі права захищені.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-gray-400 transition-colors">
            Політика конфіденційності
          </Link>
          <Link href="#" className="hover:text-gray-400 transition-colors">
            Умови використання
          </Link>
        </div>
      </div>
    </footer>
  );
}

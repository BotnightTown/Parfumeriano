export default function Footer() {
  return (
    <footer className="w-full h-max flex flex-col gap-5 p-5 md:px-10 items-center justify-center bg-black text-white">
      <div className="w-full h-max flex flex-col md:flex-row justify-between items-center px-5 gap-3">
        <div className="w-max h-max flex gap-2 flex-row items-center cursor-pointer">
          <img
            src="/images/logo/Logo Light.svg"
            alt="Parfumeriano logo"
            className="w-[26px] h-8"
          />
          <p className="text-lg font-medium">Parfumeriano</p>
        </div>
        <div className="w-max h-max flex flex-col gap-2.5 text-sm text-center text-gray-300">
          <p>м. Миколаїв вул. Євгенія Логінова 19Г</p>
          <p>perfumeriano.biz@gmail.com</p>
        </div>
      </div>
      <div className="w-full h-full border-t border-gray-700 px-5 pt-2.5 flex flex-row justify-between items-center text-sm text-gray-400">
        <p>(с) Parfumeriano</p>
        <p>All rights received</p>
      </div>
    </footer>
  );
}

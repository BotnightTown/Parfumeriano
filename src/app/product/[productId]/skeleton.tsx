export default function Skeleton() {
  return (
    <main className="w-full min-h-full h-max px-0 md:px-10 lg:px-20 flex flex-col md:gap-10 animate-pulse">
      <section className="w-full h-max md:h-[345px] flex flex-col md:grid md:grid-cols-2 items-center gap-2.5">
        <div className="w-full h-max flex flex-col gap-2.5">
          <div className="w-full h-[230px] md:h-[250px] flex justify-center">
            <div className="w-[200px] h-full bg-gray-200 rounded-lg" />
          </div>
        </div>

        <div className="w-[315px] h-max flex flex-col gap-2.5">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-48 bg-gray-200 rounded mt-1" />
            <div className="h-3 w-28 bg-gray-200 rounded mt-1" />
          </div>
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-9 w-full bg-gray-200 rounded-sm" />
          <div className="h-9 w-full bg-gray-200 rounded-sm" />
        </div>
      </section>

      <section className="w-full py-5 grid grid-cols-2 gap-2.5 md:gap-15 lg:gap-25 md:border border-gray-300 rounded-xl">
        <div className="w-full h-full flex flex-col items-end gap-4 p-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
        <ul className="w-max min-h-60 h-max py-4 flex flex-col gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <li
              key={i}
              className="h-4 bg-gray-200 rounded"
              style={{ width: `${120 + (i % 3) * 30}px` }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

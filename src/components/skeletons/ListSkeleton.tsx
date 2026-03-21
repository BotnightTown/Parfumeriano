export default function ListSkeleton() {
  return (
    <section className="flex flex-col gap-5 md:gap-10 py-5 px-6 md:px-0 items-center animate-pulse">
      <div className="h-7 w-48 bg-gray-200 rounded" />

      <div className="w-full h-max grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2 lg:grid-rows-1 gap-2.5 md:gap-4 lg:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full lg:w-55 h-[260px] md:h-75 lg:h-[370px] p-2 md:p-3 border border-gray-200 rounded-xl flex flex-col gap-2 md:gap-3"
          >
            <div className="w-full h-[130px] md:h-40 lg:h-50 bg-gray-200 rounded-lg" />
            <div className="w-full h-full flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded" />
                <div className="h-7 w-full bg-gray-200 rounded-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
        ))}
      </div>
    </section>
  );
}

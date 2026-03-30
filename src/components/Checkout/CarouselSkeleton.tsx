export default function CarouselSkeleton() {
  return (
    <article className="relative w-full h-60 md:h-[500px] overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gray-200" />
      <div className="absolute inset-0 bg-linear-to-t from-gray-300/70 via-transparent to-transparent" />

      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-16 pb-8 md:pb-12 gap-4">
        <div className="h-6 md:h-8 w-72 md:w-96 bg-gray-300 rounded" />

        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-gray-300" />
          <div className="flex gap-2 items-center">
            <div className="h-1.5 w-6 rounded-full bg-gray-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-300" />
        </div>
      </div>
    </article>
  );
}

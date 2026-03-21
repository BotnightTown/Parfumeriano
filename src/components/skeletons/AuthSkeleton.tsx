type AuthSkeletonProps = {
  fields?: number;
};

export default function AuthSkeleton({ fields = 2 }: AuthSkeletonProps) {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4 p-6 border rounded-xl animate-pulse">
        <div className="h-7 w-24 bg-gray-200 rounded mx-auto" />
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="h-9 w-full bg-gray-200 rounded" />
        ))}
        <div className="h-9 w-full bg-gray-300 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
      </div>
    </main>
  );
}

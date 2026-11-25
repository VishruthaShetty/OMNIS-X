export function SkeletonCard() {
  return (
    <div className="card-glow p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-7 w-16" />
          <div className="skeleton h-3 w-24" />
        </div>
        <div className="skeleton h-11 w-11 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonLine({ w = 'w-full' }: { w?: string }) {
  return <div className={`skeleton h-4 ${w}`} />;
}

export function SkeletonBlock({ h = 'h-40' }: { h?: string }) {
  return <div className={`skeleton ${h} w-full rounded-xl`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <SkeletonBlock h="h-[420px]" />
        <SkeletonBlock h="h-[420px]" />
        <SkeletonBlock h="h-[420px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonBlock h="h-44" />
        <SkeletonBlock h="h-44" />
        <SkeletonBlock h="h-44" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonBlock h="h-52" />
        <SkeletonBlock h="h-52" />
        <SkeletonBlock h="h-52" />
      </div>
    </div>
  );
}

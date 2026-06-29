export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
        <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    </div>
  );
}

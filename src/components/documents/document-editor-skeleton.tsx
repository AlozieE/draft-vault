export function DocumentEditorSkeleton() {
  return (
    <div className="flex h-[calc(100vh-6.5rem)] min-h-0 flex-col gap-6">
      <div className="flex shrink-0 items-start justify-between gap-4">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-muted" />
        <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="animate-pulse rounded-xl bg-muted" />
          <div className="animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}

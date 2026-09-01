export function LoadingProfile() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6">
      <div className="animate-pulse space-y-6">
        <div className="h-48 rounded-xl bg-muted" />

        <div className="space-y-3">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-24 rounded-xl bg-muted" />
          <div className="h-24 rounded-xl bg-muted" />
          <div className="h-24 rounded-xl bg-muted" />
          <div className="h-24 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
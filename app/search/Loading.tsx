export default function Loading() {
  return (
    <main className="p-6">
      <div className="mb-6 h-10 w-full animate-pulse rounded bg-muted" />
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-24 w-full animate-pulse rounded bg-muted"
          />
        ))}
      </div>
    </main>
  );
}

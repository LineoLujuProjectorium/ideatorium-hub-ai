export default function DashboardPage() {
  return (
    <main className="p-8 text-white">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <section className="mt-6 grid gap-4">
        <div className="rounded-lg border border-white/10 p-4">
          <h2 className="font-medium">Projects</h2>
          <p className="opacity-60">No projects loaded yet.</p>
        </div>

        <div className="rounded-lg border border-white/10 p-4">
          <h2 className="font-medium">AI Activity</h2>
          <p className="opacity-60">No conversations yet.</p>
        </div>
      </section>
    </main>
  );
}

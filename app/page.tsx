export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="opacity-70">
          Your active ideas, systems, and experiments.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-6">
        <div className="border border-white/10 p-6">
          <h3 className="font-semibold mb-2">Active Projects</h3>
          <p className="text-sm opacity-70">0 projects loaded</p>
        </div>

        <div className="border border-white/10 p-6">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <p className="text-sm opacity-70">Nothing yet</p>
        </div>

        <div className="border border-white/10 p-6">
          <h3 className="font-semibold mb-2">System Status</h3>
          <p className="text-sm opacity-70">All systems nominal</p>
        </div>
      </section>
    </div>
  );
}

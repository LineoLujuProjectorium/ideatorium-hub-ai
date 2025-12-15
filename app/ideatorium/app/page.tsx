import { notFound } from "next/navigation";
import { getApp } from "@/lib/apps";
import { getBlockers } from "@/lib/validators";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AppPage({ params }: PageProps) {
  const app = await getApp(params.id);

  if (!app) {
    notFound();
  }

  const blockers = getBlockers();

  return (
    <main className="p-10 space-y-8 text-white">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{app.name}</h1>
          <p className="text-sm opacity-60">App ID: {app.id}</p>
        </div>

        <span className="rounded-full bg-white/10 px-4 py-1 text-sm">
          {app.status}
        </span>
      </header>

      {/* Overview */}
      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <p className="text-sm opacity-80">
          Created: {new Date(app.createdAt).toLocaleString()}
        </p>
      </section>

      {/* Blockers */}
      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Blockers</h2>

        {blockers.length === 0 ? (
          <p className="text-sm opacity-60">No blockers</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {blockers.map((blocker, i) => (
              <li key={i}>{blocker}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Actions */}
      <section className="flex gap-4">
        <button className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition">
          Open Builder
        </button>

        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-black hover:bg-emerald-500 transition">
          Publish
        </button>
      </section>
    </main>
  );
}

// app/ideatorium/page.tsx

import Link from "next/link"

type IdeatoriumApp = {
  id: string
  name: string
  summary: string
  status: "active" | "draft" | "archived"
}

const APPS: IdeatoriumApp[] = [
  {
    id: "litigation",
    name: "Litigation",
    summary: "Legal intelligence, timelines, filings, and case memory.",
    status: "active",
  },
  {
    id: "cr8qr8",
    name: "CR8 / QR8",
    summary: "Creative IP capture, QR monetisation, rights & royalties.",
    status: "active",
  },
  {
    id: "heirloom",
    name: "Heirloom-Lii",
    summary: "Legacy, land, cattle, dowry & generational systems.",
    status: "draft",
  },
]

export default function IdeatoriumIndex() {
  return (
    <main className="min-h-screen bg-black text-white p-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold">Ideatorium</h1>
        <p className="text-white/60 max-w-xl">
          A registry of real products. Each app is buildable, deployable, and ownable.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {APPS.map(app => (
          <Link
            key={app.id}
            href={`/ideatorium/${app.id}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">{app.name}</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  app.status === "active"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {app.status}
              </span>
            </div>
            <p className="text-sm text-white/60">{app.summary}</p>
            <div className="mt-6 text-sm text-white/80 group-hover:underline">
              Open →
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

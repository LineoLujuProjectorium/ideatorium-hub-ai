import Link from "next/link";

export default function IdeatoriumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      {/* LEFT SYSTEM NAV */}
      <aside className="w-64 border-r border-white/10 p-4 space-y-4">
        <div className="text-sm uppercase opacity-50">Ideatorium</div>

        <nav className="space-y-2">
          <Link href="/ideatorium/core" className="block rounded px-3 py-2 hover:bg-white/10">
            Core Engine
          </Link>
          <Link href="/ideatorium/cr8qr8" className="block rounded px-3 py-2 hover:bg-white/10">
            CR8 / QR8
          </Link>
          <Link href="/ideatorium/heirloom" className="block rounded px-3 py-2 hover:bg-white/10">
            Heirloom-Lii
          </Link>
        </nav>
      </aside>

      {/* MAIN EXECUTION SURFACE */}
      <section className="flex-1 overflow-auto">
        {children}
      </section>

      {/* RIGHT ACTION RAIL */}
      <aside className="w-72 border-l border-white/10 p-4 space-y-4">
        <div className="text-sm uppercase opacity-50">Actions</div>

        <button className="w-full rounded bg-white/10 px-3 py-2 hover:bg-white/20">
          + New Module
        </button>

        <button className="w-full rounded bg-white/10 px-3 py-2 hover:bg-white/20">
          + Register App
        </button>

        <button className="w-full rounded bg-white/10 px-3 py-2 hover:bg-white/20">
          Ship Build
        </button>
      </aside>
    </div>
  );
}

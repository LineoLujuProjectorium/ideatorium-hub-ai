import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Ideatorium",
  description: "Think. Build. Ship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="min-h-screen grid grid-cols-[240px_1fr_320px]">
          
          {/* Left Nav */}
          <aside className="border-r border-white/10 p-6">
            <h1 className="text-xl font-bold mb-8">Ideatorium</h1>
            <nav className="space-y-3 text-sm">
              <Link href="/" className="block hover:underline">Dashboard</Link>
              <Link href="/projects" className="block hover:underline">Projects</Link>
              <Link href="/search" className="block hover:underline">Search</Link>
              <Link href="/templates" className="block hover:underline">Templates</Link>
              <Link href="/inbox" className="block hover:underline">Inbox</Link>
            </nav>
          </aside>

          {/* Main */}
          <main className="p-10 overflow-y-auto">
            {children}
          </main>

          {/* Right Panel */}
          <aside className="border-l border-white/10 p-6 space-y-6">
            <div>
              <h2 className="font-semibold mb-2">AI Chat</h2>
              <p className="text-xs opacity-70 mb-2">Chat engine online.</p>
              <textarea
                className="w-full bg-black border border-white/20 p-2 text-sm"
                placeholder="Ask Ideatorium to build, modify, or explain…"
              />
              <button className="mt-2 border px-3 py-1 text-sm">
                Send
              </button>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Blockers</h2>
              <p className="text-sm opacity-70">No blockers</p>
            </div>
          </aside>

        </div>
      </body>
    </html>
  );
}

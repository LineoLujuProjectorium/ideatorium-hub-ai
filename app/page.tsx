import Link from "next/link";

export default function Home() {
  return (
    <main className="panel" style={{ margin: 40, padding: 40 }}>
      <h1>Ideatorium</h1>
      <nav style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/search">Search</Link>
        <Link href="/projects">All Projects</Link>
        <Link href="/templates">Templates</Link>
        <Link href="/inbox">Inbox</Link>
      </nav>
    </main>
  );
}

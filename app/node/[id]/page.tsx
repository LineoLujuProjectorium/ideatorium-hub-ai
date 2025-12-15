import { notFound } from "next/navigation";
import { getNodeById, getEdgesForNode } from "@/lib/domain";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NodePage({ params }: PageProps) {
  const node = await getNodeById(params.id);

  if (!node) {
    notFound();
  }

  const edges = await getEdgesForNode(node.id);

  return (
    <main className="p-10 space-y-8 text-white">
      {/* Header */}
      <header>
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          {node.type}
        </p>
        <h1 className="text-3xl font-bold break-all">{node.id}</h1>
      </header>

      {/* Connections */}
      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Connections</h2>

        {edges.length === 0 ? (
          <p className="text-sm opacity-60">No connected nodes</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {edges.map((edge, index) => (
              <li key={`${edge.from}-${edge.to}-${index}`}>
                {edge.from} → {edge.to}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

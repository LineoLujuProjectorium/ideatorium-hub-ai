import { getNodeById } from "@/lib/ideatorium/engine";
import { notFound } from "next/navigation";

export default function NodeControlPage({
  params,
}: {
  params: { id: string };
}) {
  const node = getNodeById(params.id);
  if (!node) return notFound();

  return (
    <div className="p-10 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">{node.name}</h1>
        <p className="opacity-60">
          {node.type} · {node.status}
        </p>
      </header>

      <section className="grid grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="font-medium mb-2">Modules</h3>
          <p className="opacity-60 text-sm">
            Runtime capabilities attached to this node.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="font-medium mb-2">Pipelines</h3>
          <p className="opacity-60 text-sm">
            Build, test, deploy flows.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="font-medium mb-2">Permissions</h3>
          <p className="opacity-60 text-sm">
            Who can touch what.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 p-6">
        <h3 className="font-medium mb-4">Execution Log</h3>
        <div className="text-sm opacity-50">
          No executions yet.
        </div>
      </section>
    </div>
  );
}

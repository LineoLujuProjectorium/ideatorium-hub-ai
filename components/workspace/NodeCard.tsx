import { IdeatoriumNode } from "@/lib/domain";

export function NodeCard({ node }: { node: IdeatoriumNode }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-white">
      {/* Node Type */}
      <div className="text-xs uppercase tracking-wide text-neutral-400">
        {node.type}
      </div>

      {/* Node Label / Fallback */}
      <div className="mt-1 text-lg font-medium">
        {node.label ?? node.id}
      </div>

      {/* Metadata preview (optional, future-safe) */}
      {node.metadata && (
        <pre className="mt-3 text-xs text-neutral-500 overflow-hidden text-ellipsis">
          {JSON.stringify(node.metadata, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default NodeCard;

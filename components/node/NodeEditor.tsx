"use client";

import { useState } from "react";
import { recordVersion } from "@/lib/domain";
import { NodeTimeline } from "./NodeTimeline";

export function NodeEditor({ node }: { node: any }) {
  const [draft, setDraft] = useState(node);

  return (
    <div className="space-y-4 border-t border-neutral-800 pt-6">
      <input
        className="w-full bg-neutral-900 border p-2 rounded"
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
      />

      <textarea
        className="w-full bg-neutral-900 border p-2 rounded"
        value={draft.description || ""}
        onChange={(e) =>
          setDraft({ ...draft, description: e.target.value })
        }
      />

      <button
        className="border px-3 py-1 rounded"
        onClick={() => recordVersion(draft)}
      >
        Commit Version
      </button>

      <NodeTimeline history={draft.history} />
    </div>
  );
}

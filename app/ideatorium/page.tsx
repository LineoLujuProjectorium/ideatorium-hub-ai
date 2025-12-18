"use client";

import { useState } from "react";
import CreateBar from "@/components/CreateBar";
import { getApps } from "@/engine/store/apps.table";

export default function IdeatoriumPage() {
  const [, force] = useState(0);
  const apps = getApps();

  return (
    <main style={{ padding: 40 }}>
      <h1>Ideatorium</h1>

      <CreateBar onCreate={() => force((v) => v + 1)} />

      <section style={{ marginTop: 40 }}>
        {apps.map((app) => (
          <div key={app.id} style={{ border: "1px solid #333", padding: 16 }}>
            <strong>{app.name}</strong>
            <pre>{Object.keys(app.files).join("\n")}</pre>
          </div>
        ))}
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { CreateBar } from "./CreateBar";

async function compileApp(input: string) {
  // deterministic placeholder engine output
  return {
    intent: input,
    fileGraph: {
      "app/page.tsx": `
        export default function GeneratedApp() {
          return (
            <main style={{ padding: 40 }}>
              <h1>${input}</h1>
              <p>This app was generated.</p>
            </main>
          );
        }
      `,
    },
  };
}

async function registerApp(app: {
  name: string;
  intent: string;
  files: string[];
}) {
  return { id: Date.now().toString() };
}

async function writeFiles(appId: string, files: Record<string, string>) {
  console.log("Writing files for", appId, files);
}

function mountApp(appId: string) {
  console.log("Mounting app", appId);
}

function deriveName(input: string) {
  return input.slice(0, 32);
}

export default function IdeatoriumApp() {
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  async function onSend(input: string) {
    setBusy(true);
    setLog((l) => [...l, `→ ${input}`]);

    const { intent, fileGraph } = await compileApp(input);

    const app = await registerApp({
      name: deriveName(input),
      intent,
      files: Object.keys(fileGraph),
    });

    await writeFiles(app.id, fileGraph);
    mountApp(app.id);

    setLog((l) => [...l, `✓ App ${app.id} created`]);
    setBusy(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Ideatorium</h1>

      <CreateBar onSend={onSend} disabled={busy} />

      <div className="w-full max-w-xl border p-4 text-sm">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </main>
  );
}

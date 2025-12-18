"use client";

import { useState } from "react";
import { createAppFromPrompt } from "@/engine/compiler";

export default function CreateBar({ onCreate }: { onCreate: () => void }) {
  const [value, setValue] = useState("");

  async function handleSend() {
    if (!value.trim()) return;
    await createAppFromPrompt(value);
    setValue("");
    onCreate();
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Create a dashboard, web app, API..."
        style={{ flex: 1, padding: 10 }}
      />
      <button onClick={handleSend}>Create</button>
    </div>
  );
}

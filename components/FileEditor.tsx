"use client";

import { useState } from "react";

export default function FileEditor({
  files,
  onSave,
}: {
  files: Record<string, string>;
  onSave: (path: string, value: string) => void;
}) {
  const [active, setActive] = useState(Object.keys(files)[0]);

  return (
    <div style={{ display: "flex" }}>
      <ul style={{ width: 200 }}>
        {Object.keys(files).map((f) => (
          <li key={f} onClick={() => setActive(f)}>
            {f}
          </li>
        ))}
      </ul>
      <textarea
        style={{ flex: 1, height: "70vh" }}
        value={files[active]}
        onChange={(e) => onSave(active, e.target.value)}
      />
    </div>
  );
}

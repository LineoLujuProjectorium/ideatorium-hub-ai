"use client";

import { renderHTML } from "@/engine/renderer";

export function AppPreview({ files }: { files: Record<string, string> }) {
  const html = renderHTML(files);

  return (
    <iframe
      srcDoc={html}
      style={{
        width: "100%",
        height: "600px",
        border: "1px solid #ccc",
        background: "white",
      }}
    />
  );
}

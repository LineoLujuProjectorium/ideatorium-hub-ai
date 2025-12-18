// engine/blueprints/wellness-app.ts
import { Intent } from "../intent/classify";

export function wellnessAppBlueprint(intent: Intent) {
  return {
    files: {
      "page.tsx": `
import React from 'react';
import { useState } from 'react';

export default function TherapyApp() {
  const [entries, setEntries] = useState<string[]>([]);
  const [text, setText] = useState("");
  return (
    <main style={{fontFamily:'sans-serif', padding: 20}}>
      <h1>${intent.name}</h1>
      <p>${intent.description ?? "A wellness journaling app"}</p>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="How are you feeling?" />
      <button onClick={() => { if(text){ setEntries([...entries, text]); setText(""); } }}>Add Entry</button>
      <ul>{entries.map((e,i) => <li key={i}>{e}</li>)}</ul>
    </main>
  );
}`,
    },
  };
}
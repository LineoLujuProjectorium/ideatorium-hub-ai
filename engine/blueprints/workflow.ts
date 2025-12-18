export function workflow(name: string) {
  return {
    "app/page.tsx": `
export default function ${name}Workflow() {
  return (
    <main style={{ padding: 40 }}>
      <h1>${name} Workflow</h1>
      <ol>
        <li>Start</li>
        <li>Process</li>
        <li>Complete</li>
      </ol>
    </main>
  );
}
`,
  };
}

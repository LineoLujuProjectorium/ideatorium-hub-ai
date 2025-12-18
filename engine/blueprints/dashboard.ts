export function dashboard(name: string) {
  return {
    "app/page.tsx": `
export default function ${name}Dashboard() {
  return (
    <main style={{ padding: 40 }}>
      <h1>${name} Dashboard</h1>
      <ul>
        <li>Metric A</li>
        <li>Metric B</li>
        <li>Metric C</li>
      </ul>
    </main>
  );
}
`,
  };
}

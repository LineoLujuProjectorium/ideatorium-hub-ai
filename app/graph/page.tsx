import ForceGraph from "@/components/graph/ForceGraph";

export default function GraphPage() {
  return (
    <main className="p-10 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Graph</h1>
      <ForceGraph />
    </main>
  );
}

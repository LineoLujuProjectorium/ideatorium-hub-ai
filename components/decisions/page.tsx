import DecisionLogView from "@/components/decisions/DecisionLogView";

export default function DecisionsPage() {
  // Placeholder data until wired to domain/store
  const logs = [
    {
      decision: "Initial architecture chosen",
      rationale: "Selected modular domain-driven structure for scalability."
    },
    {
      decision: "Removed graph dependencies",
      rationale: "Stabilised build before reintroducing visual layers."
    }
  ];

  return (
    <main className="p-10 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Decision Log</h1>
      <DecisionLogView logs={logs} />
    </main>
  );
}

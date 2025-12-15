import DecisionLogView from "@/components/decisions/DecisionLogView";

export default function DecisionsPage() {
  const logs = [
    {
      decision: "Initial architecture chosen",
      rationale: "Selected modular domain-driven structure for scalability."
    },
    {
      decision: "Build stabilisation",
      rationale: "Removed invalid schema assumptions to unblock compilation."
    }
  ];

  return (
    <main className="p-10 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Decision Log</h1>
      <DecisionLogView logs={logs} />
    </main>
  );
}


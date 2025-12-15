import NarrativeView from "@/components/narrative/NarrativeView";

export default function NarrativePage() {
  const events = [
    {
      text: "Ideatorium project initialised",
      timestamp: new Date().toISOString(),
    },
    {
      text: "Narrative system wired into build pipeline",
      timestamp: new Date().toISOString(),
    },
  ];

  return (
    <main className="p-10 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Narrative</h1>
      <NarrativeView events={events} />
    </main>
  );
}

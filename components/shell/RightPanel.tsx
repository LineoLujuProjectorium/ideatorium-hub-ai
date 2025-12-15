import ChatPanel from "./ChatPanel";
import VisualEditor from "./VisualEditor";

export default function RightPanel() {
  // Temporary placeholder until wired to real blockers logic
  const blockers: string[] = [];

  return (
    <aside className="panel" style={{ padding: 16, overflow: "auto" }}>
      <ChatPanel />
      <VisualEditor blockers={blockers} />
    </aside>
  );
}

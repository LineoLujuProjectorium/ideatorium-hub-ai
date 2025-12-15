interface DecisionLog {
  decision: string;
  rationale: string;
}

interface DecisionLogViewProps {
  logs: DecisionLog[];
}

export default function DecisionLogView({ logs }: DecisionLogViewProps) {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-sm text-neutral-400">
        No decisions logged.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((d, index) => (
        <div
          key={index}
          className="border border-white/10 p-3 rounded bg-white/5"
        >
          <div className="font-semibold">{d.decision}</div>
          <div className="text-sm text-neutral-400">{d.rationale}</div>
        </div>
      ))}
    </div>
  );
}

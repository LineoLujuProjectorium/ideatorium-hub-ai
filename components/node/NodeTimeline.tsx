export function NodeTimeline({ history }: { history: any[] }) {
  return (
    <div className="border border-neutral-800 rounded p-4 space-y-2">
      <h4 className="text-sm font-semibold">Timeline</h4>
      {history.map((h) => (
        <div key={h.version} className="text-xs text-neutral-400">
          v{h.version} — {new Date(h.timestamp).toLocaleString()}
        </div>
      ))}
    </div>
  );
}

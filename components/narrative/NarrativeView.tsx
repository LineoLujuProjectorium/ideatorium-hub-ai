interface NarrativeEvent {
  text: string;
  timestamp: string;
}

export default function NarrativeView({
  events,
}: {
  events: NarrativeEvent[];
}) {
  return (
    <div className="space-y-2">
      {events.map((e, i) => (
        <div key={i} className="text-sm text-neutral-400">
          {new Date(e.timestamp).toLocaleString()} — {e.text}
        </div>
      ))}
    </div>
  );
}

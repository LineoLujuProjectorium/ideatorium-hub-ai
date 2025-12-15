export default function VisualEditor({
  blockers,
}: {
  blockers: string[];
}) {
  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-sm font-semibold">Blockers</h3>

      {blockers.length === 0 ? (
        <p className="text-xs text-neutral-500">No blockers</p>
      ) : (
        <ul className="list-disc pl-4 text-xs text-neutral-400">
          {blockers.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

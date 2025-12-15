export default function BlockerList({
  blockers,
}: {
  blockers: string[];
}) {
  if (!blockers.length)
    return <div className="text-green-400">No blockers</div>;

  return (
    <ul className="text-red-400 list-disc pl-5">
      {blockers.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

export default function AppStatusBadge({
  state,
}: {
  state: string;
}) {
  const colors: Record<string, string> = {
    draft: "bg-gray-600",
    review: "bg-blue-600",
    blocked: "bg-red-600",
    approved: "bg-green-600",
    shipped: "bg-black",
  };

  return (
    <span
      className={`px-3 py-1 rounded text-white text-sm ${colors[state]}`}
    >
      {state.toUpperCase()}
    </span>
  );
}

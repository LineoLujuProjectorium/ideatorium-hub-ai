"use client";

export default function ChatPanel() {
  return (
    <div className="space-y-3 border-b border-neutral-800 pb-4">
      <h3 className="text-sm font-semibold text-white">AI Chat</h3>

      <div className="rounded bg-neutral-900 p-3 text-sm text-neutral-400">
        Chat engine online.
      </div>

      <textarea
        className="w-full rounded bg-neutral-900 p-2 text-sm text-white placeholder:text-neutral-500"
        placeholder="Ask Ideatorium to build, modify, or explain…"
        rows={3}
      />

      <button className="rounded bg-white px-3 py-1 text-sm text-black">
        Send
      </button>
    </div>
  );
}

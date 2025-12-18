"use client";

import { useState } from "react";

export function CreateBar({
  onSend,
  disabled,
}: {
  onSend: (input: string) => Promise<void>;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  async function handleSend() {
    if (!value.trim() || disabled) return;
    await onSend(value);
    setValue("");
  }

  return (
    <div className="w-full max-w-xl flex gap-2">
      <input
        className="flex-1 border px-4 py-3 text-lg"
        placeholder="Describe the app you want to make"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
      />
      <button
        className="px-6 py-3 bg-black text-white text-lg disabled:opacity-40"
        onClick={handleSend}
        disabled={disabled}
      >
        Create
      </button>
    </div>
  );
}

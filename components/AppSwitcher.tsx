"use client";

import { listApps } from "@/engine/store/apps.table";

export default function AppSwitcher({ onSelect }: { onSelect: (id: string) => void }) {
  const apps = listApps();

  return (
    <aside>
      {apps.map((a) => (
        <button key={a.id} onClick={() => onSelect(a.id)}>
          {a.name}
        </button>
      ))}
    </aside>
  );
}

// app/dashboard/page.tsx
"use client";
import useSWR from "swr";

async function fetchProjects() {
  const res = await fetch("/api/projects");
  return res.json();
}

export default function Dashboard() {
  const { data, mutate } = useSWR("/api/projects", fetchProjects, { refreshInterval: 2000 });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Your Apps</h1>
      <ul>
        {data?.projects?.map((p: any) => (
          <li key={p.id}>
            <a href={p.vercelUrl || "#"}>{p.name}</a> ({p.status})
          </li>
        ))}
      </ul>
    </main>
  );
}
export type IdeatoriumApp = {
  id: string;
  name: string;
  status: "idle" | "building" | "ready" | "shipped";
};

let apps: IdeatoriumApp[] = [
  { id: "core", name: "Core Engine", status: "ready" },
  { id: "cr8qr8", name: "CR8 / QR8", status: "building" },
  { id: "heirloom", name: "Heirloom-Lii", status: "idle" },
];

export function getApps() {
  return apps;
}

export function buildApp(id: string) {
  apps = apps.map(app =>
    app.id === id ? { ...app, status: "building" } : app
  );
}

export function shipApp(id: string) {
  apps = apps.map(app =>
    app.id === id ? { ...app, status: "shipped" } : app
  );
}

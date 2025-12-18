export type AppRecord = {
  id: string;
  createdAt: number;
};

let apps: AppRecord[] = [];

export function registerApp(id: string) {
  apps.unshift({ id, createdAt: Date.now() });
}

export function listApps() {
  return apps;
}

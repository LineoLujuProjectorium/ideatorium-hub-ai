type AppRecord = {
  id: string;
  name: string;
  files: Record<string, string>;
};

const APPS = new Map<string, AppRecord>();

export function registerApp(name: string, files: Record<string, string>) {
  const id = crypto.randomUUID();
  APPS.set(id, { id, name, files });
  return APPS.get(id)!;
}

export function getApps() {
  return Array.from(APPS.values());
}

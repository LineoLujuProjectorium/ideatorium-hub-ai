export interface IdeatoriumApp {
  id: string;
  name: string;
  status: "draft" | "active" | "published";
  version: string;
  createdAt: string;
}

const MOCK_APPS: IdeatoriumApp[] = [
  {
    id: "app-1",
    name: "Ideatorium Core",
    status: "draft",
    version: "0.1.0",
    createdAt: new Date().toISOString(),
  },
];

export function getApp(id: string): IdeatoriumApp | null {
  return MOCK_APPS.find((a) => a.id === id) ?? null;
}

export function getAllApps(): IdeatoriumApp[] {
  return MOCK_APPS;
}

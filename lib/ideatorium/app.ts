export function registerApp(app: {
  id: string;
  name: string;
  repo?: string;
}) {
  console.log("Registering app:", app);
}

export function buildApp(appId: string) {
  console.log("Building app:", appId);
}

export function shipApp(appId: string) {
  console.log("Shipping app:", appId);
}

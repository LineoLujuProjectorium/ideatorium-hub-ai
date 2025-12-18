export function apiService(name: string) {
  return {
    "app/api/route.ts": `
export async function GET() {
  return Response.json({ service: "${name}", status: "ok" });
}
`,
  };
}

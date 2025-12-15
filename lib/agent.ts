// lib/agent.ts

export async function dialogue(prompt: string) {
  return {
    role: "assistant",
    content: `Echo: ${prompt}`,
  };
}

export async function traverse(startId: string) {
  return {
    startId,
    visited: [startId],
    summary: "Traversal completed",
  };
}

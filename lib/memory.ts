// lib/memory.ts

export async function embed(text: string) {
  return {
    vector: Array(768).fill(0),
    source: text,
  };
}

export async function searchMemory(query: string) {
  return [
    {
      id: "mem_1",
      content: "Sample memory result",
      score: 0.92,
    },
  ];
}

export async function summarize(text: string) {
  if (!process.env.OPENAI_API_KEY) {
    return "AI summary unavailable (no key).";
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize concisely." },
        { role: "user", content: text },
      ],
    }),
  });

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "No summary.";
}

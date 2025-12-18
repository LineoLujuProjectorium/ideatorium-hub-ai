// engine/intent/classify.ts
import { z } from "zod";

export const IntentSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
});

export type Intent = z.infer<typeof IntentSchema>;

/**
 * Parses natural-language user input into structured blueprint intent.
 */
export async function classifyIntent(prompt: string): Promise<Intent> {
  // THIS WILL CALL YOUR AI PROVIDER (OpenAI, Anthropic, etc.)
  const response = await fetch(process.env.AI_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // or Claude 3.5
      messages: [
        {
          role: "system",
          content: "You are an intent classifier for an app creation engine. Output JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
      response_format: { type: "json_object" },
    }),
  });

  const data = await response.json();
  const parsed = IntentSchema.safeParse(data);

  if (!parsed.success) {
    console.error("Intent parse failed:", parsed.error);
    throw new Error("Invalid intent structure");
  }

  return parsed.data;
}
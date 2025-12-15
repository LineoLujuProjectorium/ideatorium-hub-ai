import { IdeatoriumNode, DecisionLog, NarrativeEvent } from "./types";

const now = Date.now();

export const nodes: IdeatoriumNode[] = [
  {
    id: "ideatorium-hub",
    name: "Ideatorium Hub",
    type: "system",
    status: "active",
    owner: "Lineo",
    values: ["strategic", "cultural"],
    description: "A living cognitive operating system.",
    history: [{ version: 1, timestamp: now, name: "Ideatorium Hub" }],
  },
];

export const decisions: DecisionLog[] = [];
export const narrative: NarrativeEvent[] = [];

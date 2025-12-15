export type NodeType = "system" | "project" | "idea";
export type NodeStatus = "active" | "dormant" | "archived";

export type NodeVersion = {
  version: number;
  timestamp: number;
  name: string;
  description?: string;
};

export type ValueTag = "creative" | "financial" | "cultural" | "strategic";

export type IdeatoriumNode = {
  id: string;
  name: string;
  type: NodeType;
  status: NodeStatus;
  description?: string;
  aiSummary?: string;
  history: NodeVersion[];
  values?: ValueTag[];
  owner?: string;
};

export type DecisionLog = {
  id: string;
  timestamp: number;
  decision: string;
  rationale: string;
  affectedNodes: string[];
};

export type NarrativeEvent = {
  timestamp: number;
  text: string;
};

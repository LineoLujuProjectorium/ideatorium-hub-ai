// ================================
// Ideatorium Domain Model (v1)
// ================================

export type IdeatoriumNode = {
  id: string;
  type: string;
  label?: string;
  metadata?: Record<string, any>;
};

export type IdeatoriumEdge = {
  from: string;
  to: string;
  type?: string;
};

export type DecisionLog = {
  decision: string;
  rationale?: string;
  createdAt: string;
};

export type VersionRecord = {
  nodeId: string;
  summary: string;
  createdAt: string;
};

// ---- In-memory baseline (replace with DB later) ----

const nodes: IdeatoriumNode[] = [
  {
    id: "root",
    type: "project",
    label: "Ideatorium Root",
  },
];

const edges: IdeatoriumEdge[] = [];
const decisions: DecisionLog[] = [];
const versions: VersionRecord[] = [];

// ---- Read APIs ----

export function getAllNodes(): IdeatoriumNode[] {
  return nodes;
}

export function getNodeById(id: string): IdeatoriumNode | undefined {
  return nodes.find((n) => n.id === id);
}

export function getEdges(): IdeatoriumEdge[] {
  return edges;
}

export function getEdgesForNode(nodeId: string): IdeatoriumEdge[] {
  return edges.filter((e) => e.from === nodeId || e.to === nodeId);
}

export function getDecisions(): DecisionLog[] {
  return decisions;
}

export function getVersionsForNode(nodeId: string): VersionRecord[] {
  return versions.filter((v) => v.nodeId === nodeId);
}

// ---- Write APIs ----

export function addNode(node: IdeatoriumNode) {
  nodes.push(node);
}

export function addEdge(edge: IdeatoriumEdge) {
  edges.push(edge);
}

export function logDecision(decision: {
  decision: string;
  rationale?: string;
}) {
  decisions.push({
    decision: decision.decision,
    rationale: decision.rationale,
    createdAt: new Date().toISOString(),
  });
}

export function recordVersion(input: {
  nodeId: string;
  summary: string;
}) {
  versions.push({
    nodeId: input.nodeId,
    summary: input.summary,
    createdAt: new Date().toISOString(),
  });
}

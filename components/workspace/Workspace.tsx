import { IdeatoriumNode } from "@/lib/domain";
import NodeCard from "./NodeCard";

const MOCK_NODES: IdeatoriumNode[] = [
  {
    id: "node-1",
    type: "idea",
    label: "First Idea",
  },
  {
    id: "node-2",
    type: "flow",
    label: "User Journey",
  },
];

export function Workspace() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {MOCK_NODES.map((node) => (
        <NodeCard key={node.id} node={node} />
      ))}
    </section>
  );
}

export default Workspace;

export type IdeatoriumNodeType = "system" | "project" | "module";

export interface IdeatoriumNode {
  id: string;
  name: string;
  type: IdeatoriumNodeType;
  status: "active" | "dormant" | "disabled";
}

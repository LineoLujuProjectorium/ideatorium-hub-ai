import { IdeatoriumNode } from "./types";

export const registry: Record<string, IdeatoriumNode> = {
  core: {
    id: "core",
    name: "Core Engine",
    type: "system",
    status: "active",
  },
  cr8qr8: {
    id: "cr8qr8",
    name: "CR8 / QR8",
    type: "project",
    status: "active",
  },
  heirloom: {
    id: "heirloom",
    name: "Heirloom-Lii",
    type: "project",
    status: "dormant",
  },
};

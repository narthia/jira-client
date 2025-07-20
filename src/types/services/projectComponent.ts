import type { User } from "./user";

export type ProjectComponent = {
  ari: string;
  assignee: User;
  assigneeType: string;
  description: string;
  id: string;
  isAssigneeTypeValid: boolean;
  lead: User;
  metadata: Record<string, unknown>;
  name: string;
  project: string;
  projectId: number;
  realAssignee: User;
  realAssigneeType: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  self: string;
};

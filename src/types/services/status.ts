import type { ClientType, JiraRequestGeneric } from "../..";

export type StatusCategory = {
  self: string;
  id: number;
  key: "new" | "indeterminate" | "done";
  colorName: string;
  name: string;
};

export type StatusCategoryType = "TODO" | "IN_PROGRESS" | "DONE";

export type StatusScope = {
  type: "PROJECT" | "GLOBAL";
  project?: { id: string };
};

export type BaseStatus = {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
};

export type Status = BaseStatus & {
  statusCategory: StatusCategoryType;
  scope: StatusScope;
  usages?: StatusUsages[];
  workflowUsages?: StatusWorkflowUsages[];
};

export type StatusUsages = {
  issueTypes: string[];
  project: { id: string };
};

export type StatusWorkflowUsages = {
  workflowId: string;
  workflowName: string;
};

export type StatusCreateBody = {
  name: string;
  description?: string;
  statusCategory: StatusCategoryType;
};

export type StatusUpdateBody = StatusCreateBody & {
  id: string;
};

export type BulkGetStatusesRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  { id: string[]; expand?: string },
  undefined
>;

export type BulkCreateStatusesRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  undefined,
  { scope: StatusScope; statuses: StatusCreateBody[] }
>;

export type BulkEditStatusesRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  undefined,
  { statuses: StatusUpdateBody[] }
>;

export type BulkDeleteStatusesRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  { id: string[] },
  undefined
>;

import type { ClientType, JiraRequestGeneric } from "../global";
import type { Project } from "./common";

export type IssueType = {
  self: string;
  id: string;
  description?: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
  hierarchyLevel: number;
  scope?: IssueTypeScope;
};

export type IssueTypeScope = {
  type: "PROJECT" | "TEMPLATE";
  project?: Project;
};

export type IssueTypeCreateBody = {
  name: string;
  description?: string;
  hierarchyLevel?: number;
  type?: "subtask" | "standard";
};

export type IssueTypeUpdateBody = {
  name?: string;
  description?: string;
  avatarId?: number;
};

export type GetIssueTypeRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { id: string },
  undefined,
  undefined
>;

export type CreateIssueTypeRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  undefined,
  IssueTypeCreateBody
>;

export type UpdateIssueTypeRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { id: string },
  undefined,
  IssueTypeUpdateBody
>;

export type DeleteIssueTypeRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { id: string },
  { alternativeIssueTypeId?: string },
  undefined
>;

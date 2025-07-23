export interface AddAtlassianTeamRequest {
  /** The capacity for the Atlassian team. */
  capacity?: number;
  /** The Atlassian team ID. */
  id: string;
  /** The ID of the issue source for the Atlassian team. */
  issueSourceId?: number;
  /** The planning style for the Atlassian team. This must be "Scrum" or "Kanban". */
  planningStyle: "Scrum" | "Kanban";
  /** The sprint length for the Atlassian team. */
  sprintLength?: number;
}
export interface CreatePlanOnlyTeamRequest {
  /** The capacity for the plan-only team. */
  capacity?: number;
  /** The ID of the issue source for the plan-only team. */
  issueSourceId?: number;
  /** The account IDs of the plan-only team members. */
  memberAccountIds?: string[];
  /** The plan-only team name. */
  name: string;
  /** The planning style for the plan-only team. This must be "Scrum" or "Kanban". */
  planningStyle: "Scrum" | "Kanban";
  /** The sprint length for the plan-only team. */
  sprintLength?: number;
}
export interface GetAtlassianTeamResponse {
  /** The capacity for the Atlassian team. */
  capacity?: number;
  /** The Atlassian team ID. */
  id: string;
  /** The ID of the issue source for the Atlassian team. */
  issueSourceId?: number;
  /** The planning style for the Atlassian team. This is "Scrum" or "Kanban". */
  planningStyle: "Scrum" | "Kanban";
  /** The sprint length for the Atlassian team. */
  sprintLength?: number;
}
export interface GetPlanOnlyTeamResponse {
  /** The capacity for the plan-only team. */
  capacity?: number;
  /** The plan-only team ID. */
  id: number;
  /** The ID of the issue source for the plan-only team. */
  issueSourceId?: number;
  /** The account IDs of the plan-only team members. */
  memberAccountIds?: string[];
  /** The plan-only team name. */
  name: string;
  /** The planning style for the plan-only team. This is "Scrum" or "Kanban". */
  planningStyle: "Scrum" | "Kanban";
  /** The sprint length for the plan-only team. */
  sprintLength?: number;
}
export interface GetTeamResponseForPage {
  /** The team ID. */
  id: string;
  /** The team name. This is returned if the type is "PlanOnly". */
  name?: string;
  /** The team type. This is "PlanOnly" or "Atlassian". */
  type: "PlanOnly" | "Atlassian";
}
export interface PageWithCursorGetTeamResponseForPage {
  cursor?: string;
  last?: boolean;
  nextPageCursor?: string;
  size?: number;
  total?: number;
  values?: GetTeamResponseForPage[];
}

import type { ProjectIssueTypes, ProjectId } from "./common";
/** Details of a status. */
export interface JiraStatus {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The scope of the status. */
  scope?: StatusScope;
  /** The category of the status. */
  statusCategory?: "TODO" | "IN_PROGRESS" | "DONE";
  /**
   * Deprecated. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
   * for details.
   *
   * Projects and issue types where the status is used. Only available if the
   * `usages` expand is requested.
   */
  usages?: (ProjectIssueTypes | null)[] | null;
  /**
   * Deprecated. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
   * for details.
   *
   * The workflows that use this status. Only available if the `workflowUsages`
   * expand is requested.
   */
  workflowUsages?: (WorkflowUsages | null)[] | null;
}
export interface PageOfStatuses {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The URL of the next page of results, if any. */
  nextPage?: string;
  /** The URL of this page. */
  self?: string;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** Number of items that satisfy the search. */
  total?: number;
  /** The list of items. */
  values?: JiraStatus[];
}
/** Details of the status being created. */
export interface StatusCreate {
  /** The description of the status. */
  description?: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: "TODO" | "IN_PROGRESS" | "DONE";
}
/** Details of the statuses being created and their scope. */
export interface StatusCreateRequest {
  /** The scope of the status. */
  scope: StatusScope;
  /** Details of the statuses being created. */
  statuses: StatusCreate[];
}
/** The list of issue types. */
export interface StatusProjectIssueTypeUsage {
  /** The issue type ID. */
  id?: string;
}
/** The issue types using this status in a project. */
export interface StatusProjectIssueTypeUsageDto {
  /** A page of issue types. */
  issueTypes?: StatusProjectIssueTypeUsagePage;
  /** The project ID. */
  projectId?: string;
  /** The status ID. */
  statusId?: string;
}
/** A page of issue types. */
export interface StatusProjectIssueTypeUsagePage {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of issue types. */
  values?: StatusProjectIssueTypeUsage[];
}
/** The project. */
export interface StatusProjectUsage {
  /** The project ID. */
  id?: string;
}
/** The projects using this status. */
export interface StatusProjectUsageDto {
  /** A page of projects. */
  projects?: StatusProjectUsagePage;
  /** The status ID. */
  statusId?: string;
}
/** A page of projects. */
export interface StatusProjectUsagePage {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of projects. */
  values?: StatusProjectUsage[];
}
/** The scope of the status. */
export interface StatusScope {
  /** Project ID details. */
  project?: ProjectId | null;
  /**
   * The scope of the status. `GLOBAL` for company-managed projects and `PROJECT`
   * for team-managed projects.
   */
  type: "PROJECT" | "GLOBAL";
}
/** Details of the status being updated. */
export interface StatusUpdate extends Record<string, unknown> {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: "TODO" | "IN_PROGRESS" | "DONE";
}
/** The list of statuses that will be updated. */
export interface StatusUpdateRequest {
  /** The list of statuses that will be updated. */
  statuses: StatusUpdate[];
}
/** Workflows using the status. */
export interface StatusWorkflowUsageDto {
  /** The status ID. */
  statusId?: string;
  /** A page of workflows. */
  workflows?: StatusWorkflowUsagePage;
}
/** A page of workflows. */
export interface StatusWorkflowUsagePage {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of statuses. */
  values?: StatusWorkflowUsageWorkflow[];
}
/** The worflow. */
export interface StatusWorkflowUsageWorkflow {
  /** The workflow ID. */
  id?: string;
}
/**
 * Deprecated. See the [deprecation
 * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
 * for details.
 *
 * The workflows that use this status. Only available if the `workflowUsages`
 * expand is requested.
 */
export interface WorkflowUsages {
  /** Workflow ID. */
  workflowId?: string;
  /** Workflow name. */
  workflowName?: string;
}

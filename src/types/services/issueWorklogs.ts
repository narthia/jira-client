import type { EntityProperty, UserDetails, Visibility } from "./common";
/** Details of a changed worklog. */
export interface ChangedWorklog {
  /** Details of properties associated with the change. */
  properties?: EntityProperty[];
  /** The datetime of the change. */
  updatedTime?: number;
  /** The ID of the worklog. */
  worklogId?: number;
}
/** List of changed worklogs. */
export interface ChangedWorklogs {
  lastPage?: boolean;
  /** The URL of the next list of changed worklogs. */
  nextPage?: string;
  /** The URL of this changed worklogs list. */
  self?: string;
  /** The datetime of the first worklog item in the list. */
  since?: number;
  /** The datetime of the last worklog item in the list. */
  until?: number;
  /** Changed worklog list. */
  values?: ChangedWorklog[];
}
/** Paginated list of worklog details */
export interface PageOfWorklogs extends Record<string, unknown> {
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
  /** List of worklogs. */
  worklogs?: Worklog[];
}
/** Details of a worklog. */
export interface Worklog extends Record<string, unknown> {
  /** Details of the user who created the worklog. */
  author?: UserDetails;
  /**
   * A comment about the worklog in [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
   * Optional when creating or updating a worklog.
   */
  comment?: unknown;
  /** The datetime on which the worklog was created. */
  created?: string;
  /** The ID of the worklog record. */
  id?: string;
  /** The ID of the issue this worklog is for. */
  issueId?: string;
  /**
   * Details of properties for the worklog. Optional when creating or updating a
   * worklog.
   */
  properties?: EntityProperty[];
  /** The URL of the worklog item. */
  self?: string;
  /**
   * The datetime on which the worklog effort was started. Required when creating a
   * worklog. Optional when updating a worklog.
   */
  started?: string;
  /**
   * The time spent working on the issue as days (\#d), hours (\#h), or minutes (\#m
   * or \#). Required when creating a worklog if `timeSpentSeconds` isn't provided.
   * Optional when updating a worklog. Cannot be provided if `timeSpentSecond` is
   * provided.
   */
  timeSpent?: string;
  /**
   * The time in seconds spent working on the issue. Required when creating a
   * worklog if `timeSpent` isn't provided. Optional when updating a worklog. Cannot
   * be provided if `timeSpent` is provided.
   */
  timeSpentSeconds?: number;
  /** Details of the user who last updated the worklog. */
  updateAuthor?: UserDetails;
  /** The datetime on which the worklog was last updated. */
  updated?: string;
  /**
   * Details about any restrictions in the visibility of the worklog. Optional when
   * creating or updating a worklog.
   */
  visibility?: Visibility;
}
export interface WorklogIdsRequestBean {
  /** A list of worklog IDs. */
  ids: number[];
}
export interface WorklogsMoveRequestBean {
  /** A list of worklog IDs. */
  ids?: number[];
  /** The issue id or key of the destination issue */
  issueIdOrKey?: string;
}

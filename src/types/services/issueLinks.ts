import type {
  UserDetails,
  IssueTypeDetails,
  Priority,
  StatusDetails,
  IssueLinkType,
  Comment
} from "./common";
/** Priority schemes associated with the issue priority. */
export interface ExpandPrioritySchemePage extends Record<string, unknown> {
  maxResults?: number;
  startAt?: number;
  total?: number;
}
/** Key fields from the linked issue. */
export interface IssueLinkFields {
  /** The assignee of the linked issue. */
  assignee?: UserDetails;
  /** The type of the linked issue. */
  issueType?: IssueTypeDetails;
  /** Details about an issue type. */
  issuetype?: IssueTypeDetails;
  /** The priority of the linked issue. */
  priority?: Priority;
  /** The status of the linked issue. */
  status?: StatusDetails;
  /** The summary description of the linked issue. */
  summary?: string;
  /** The time tracking of the linked issue. */
  timetracking?: TimeTrackingDetails;
}
/** Details of a link between issues. */
export interface IssueLink {
  /** The ID of the issue link. */
  id?: string;
  /**
   * Provides details about the linked issue. If presenting this link in a user
   * interface, use the `inward` field of the issue link type to label the link.
   */
  inwardIssue: LinkedIssue;
  /**
   * Provides details about the linked issue. If presenting this link in a user
   * interface, use the `outward` field of the issue link type to label the link.
   */
  outwardIssue: LinkedIssue;
  /** The URL of the issue link. */
  self?: string;
  /** The type of link between the issues. */
  type: IssueLinkType;
}
/** The ID or key of a linked issue. */
export interface LinkedIssue {
  /** The fields associated with the issue. */
  fields?: IssueLinkFields;
  /** The ID of an issue. Required if `key` isn't provided. */
  id?: string;
  /** The key of an issue. Required if `id` isn't provided. */
  key?: string;
  /** The URL of the issue. */
  self?: string;
}
export interface LinkIssueRequestJsonBean {
  /** A comment. */
  comment?: Comment;
  /** The ID or key of a linked issue. */
  inwardIssue: LinkedIssue;
  /** The ID or key of a linked issue. */
  outwardIssue: LinkedIssue;
  /**
   * This object is used as follows:
   *
   *  *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it defines and
   * reports on the type of link between the issues. Find a list of issue link types
   * with [Get issue link types](#api-rest-api-3-issueLinkType-get).
   *  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it
   * defines and reports on issue link types.
   */
  type: IssueLinkType;
}
/** Time tracking details. */
export interface TimeTrackingDetails {
  /** The original estimate of time needed for this issue in readable format. */
  originalEstimate?: string;
  /** The original estimate of time needed for this issue in seconds. */
  originalEstimateSeconds?: number;
  /** The remaining estimate of time needed for this issue in readable format. */
  remainingEstimate?: string;
  /** The remaining estimate of time needed for this issue in seconds. */
  remainingEstimateSeconds?: number;
  /** Time worked on this issue in readable format. */
  timeSpent?: string;
  /** Time worked on this issue in seconds. */
  timeSpentSeconds?: number;
}

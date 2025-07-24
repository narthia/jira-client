import type { User } from "./common";
/** Count of issues assigned to a component. */
export interface ComponentIssuesCount {
  /** The count of issues assigned to a component. */
  issueCount?: number;
  /** The URL for this count of issues for a component. */
  self?: string;
}
export interface ComponentJsonBean extends Record<string, unknown> {
  ari?: string;
  description?: string;
  id?: string;
  metadata?: {
    [key: string]: string;
  };
  name?: string;
  self?: string;
}
/** Details about a component with a count of the issues it contains. */
export interface ComponentWithIssueCount {
  /**
   * The details of the user associated with `assigneeType`, if any. See
   * `realAssignee` for details of the user assigned to issues created with this
   * component.
   */
  assignee?: User;
  /**
   * The nominal user type used to determine the assignee for issues created with
   * this component. See `realAssigneeType` for details on how the type of the user,
   * and hence the user, assigned to issues is determined. Takes the following
   * values:
   *
   *  *  `PROJECT_LEAD` the assignee to any issues created with this component is
   * nominally the lead for the project the component is in.
   *  *  `COMPONENT_LEAD` the assignee to any issues created with this component is
   * nominally the lead for the component.
   *  *  `UNASSIGNED` an assignee is not set for issues created with this component.
   *  *  `PROJECT_DEFAULT` the assignee to any issues created with this component is
   * nominally the default assignee for the project that the component is in.
   */
  assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  /** The description for the component. */
  description?: string;
  /** The unique identifier for the component. */
  id?: string;
  /**
   * Whether a user is associated with `assigneeType`. For example, if the
   * `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set,
   * then `false` is returned.
   */
  isAssigneeTypeValid?: boolean;
  /** Count of issues for the component. */
  issueCount?: number;
  /** The user details for the component's lead user. */
  lead?: User;
  /** The name for the component. */
  name?: string;
  /** The key of the project to which the component is assigned. */
  project?: string;
  /** Not used. */
  projectId?: number;
  /**
   * The user assigned to issues created with this component, when `assigneeType`
   * does not identify a valid assignee.
   */
  realAssignee?: User;
  /**
   * The type of the assignee that is assigned to issues created with this
   * component, when an assignee cannot be set from the `assigneeType`. For example,
   * `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This
   * property is set to one of the following values:
   *
   *  *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead
   * has permission to be assigned issues in the project that the component is in.
   *  *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component
   * lead has permission to be assigned issues in the project that the component is
   * in.
   *  *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to
   * allow unassigned issues.
   *  *  `PROJECT_DEFAULT` when none of the preceding cases are true.
   */
  realAssigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  /** The URL for this count of the issues contained in the component. */
  self?: string;
}
/** A page of items. */
export interface PageBean2ComponentJsonBean {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: ComponentJsonBean[];
}
/** A page of items. */
export interface PageBeanComponentWithIssueCount {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: ComponentWithIssueCount[];
}

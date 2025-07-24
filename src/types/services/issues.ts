import type {
  IssueBean,
  ErrorCollection,
  UserDetails,
  JsonTypeBean,
  StatusDetails,
  Scope,
  EntityProperty,
  SimpleLink,
  GroupName,
  AvatarUrlsBean,
  IssueBeanKnownUpdateFields
} from "./common";
/** Details of a filter for exporting archived issues. */
export interface ArchivedIssuesFilterRequest extends Record<string, unknown> {
  /** List archived issues archived by a specified account ID. */
  archivedBy?: string[];
  /** List issues archived within a specified date range. */
  archivedDateRange?: DateRangeFilterRequest;
  /** List archived issues with a specified issue type ID. */
  issueTypes?: string[];
  /** List archived issues with a specified project key. */
  projects?: string[];
  /** List archived issues where the reporter is a specified account ID. */
  reporters?: string[];
}
export interface ArchiveIssueAsyncRequest {
  jql?: string;
}
/** Request bean for bulk changelog retrieval */
export interface BulkChangelogRequestBean {
  /** List of field IDs to filter changelogs */
  fieldIds?: string[];
  /** List of issue IDs/keys to fetch changelogs for */
  issueIdsOrKeys: string[];
  /** The maximum number of items to return per page */
  maxResults?: number;
  /** The cursor for pagination */
  nextPageToken?: string;
}
/** A page of changelogs which is designed to handle multiple issues */
export interface BulkChangelogResponseBean {
  /** The list of issues changelogs. */
  issueChangeLogs?: IssueChangeLog[];
  /**
   * Continuation token to fetch the next page. If this result represents the last
   * or the only page, this token will be null.
   */
  nextPageToken?: string;
}
export interface BulkFetchIssueRequestBean {
  /**
   * Use [expand](#expansion) to include additional information about issues in the
   * response. Note that, unlike the majority of instances where `expand` is
   * specified, `expand` is defined as a list of values. The expand options are:
   *
   *  *  `renderedFields` Returns field values rendered in HTML format.
   *  *  `names` Returns the display name of each field.
   *  *  `schema` Returns the schema describing a field type.
   *  *  `transitions` Returns all possible transitions for the issue.
   *  *  `operations` Returns all possible operations for the issue.
   *  *  `editmeta` Returns information about how each field can be edited.
   *  *  `changelog` Returns a list of recent updates to an issue, sorted by date,
   * starting from the most recent.
   *  *  `versionedRepresentations` Instead of `fields`, returns
   * `versionedRepresentations` a JSON array containing each version of a field's
   * value, with the highest numbered item representing the most recent version.
   */
  expand?: string[];
  /**
   * A list of fields to return for each issue, use it to retrieve a subset of
   * fields. This parameter accepts a comma-separated list. Expand options include:
   *
   *  *  `*all` Returns all fields.
   *  *  `*navigable` Returns navigable fields.
   *  *  Any issue field, prefixed with a minus to exclude.
   *
   * The default is `*navigable`.
   *
   * Examples:
   *
   *  *  `summary,comment` Returns the summary and comments fields only.
   *  *  `-description` Returns all navigable (default) fields except description.
   *  *  `*all,-comment` Returns all fields except comments.
   *
   * Multiple `fields` parameters can be included in a request.
   *
   * Note: All navigable fields are returned by default. This differs from [GET
   * issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.
   */
  fields?: string[];
  /** Reference fields by their key (rather than ID). The default is `false`. */
  fieldsByKeys?: boolean;
  /**
   * An array of issue IDs or issue keys to fetch. You can mix issue IDs and keys in
   * the same query.
   */
  issueIdsOrKeys: string[];
  /**
   * A list of issue property keys of issue properties to be included in the
   * results. A maximum of 5 issue property keys can be specified.
   */
  properties?: string[];
}
/** The list of requested issues & fields. */
export interface BulkIssueResults {
  /**
   * When Jira can't return an issue enumerated in a request due to a retriable
   * error or payload constraint, we'll return the respective issue ID with a
   * corresponding error message. This list is empty when there are no errors Issues
   * which aren't found or that the user doesn't have permission to view won't be
   * returned in this list.
   */
  issueErrors?: IssueError[];
  /** The list of issues. */
  issues?: IssueBean[];
}
export interface BulkOperationErrorResult {
  /** Error messages from an operation. */
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
  status?: number;
}
/** A change item. */
export interface ChangeDetails {
  /** The name of the field changed. */
  field?: string;
  /** The ID of the field changed. */
  fieldId?: string;
  /** The type of the field changed. */
  fieldtype?: string;
  /** The details of the original value. */
  from?: string;
  /** The details of the original value as a string. */
  fromString?: string;
  /** The details of the new value. */
  to?: string;
  /** The details of the new value as a string. */
  toString: string;
}
/**
 * A log of changes made to issue fields. Changelogs related to workflow
 * associations are currently being deprecated.
 */
export interface Changelog {
  /** The user who made the change. */
  author?: UserDetails;
  /** The date on which the change took place. */
  created?: string;
  /** The history metadata associated with the changed. */
  historyMetadata?: HistoryMetadata;
  /** The ID of the changelog. */
  id?: string;
  /** The list of items changed. */
  items?: ChangeDetails[];
}
/** Details about a created issue or subtask. */
export interface CreatedIssue {
  /** The ID of the created issue or subtask. */
  id?: string;
  /** The key of the created issue or subtask. */
  key?: string;
  /** The URL of the created issue or subtask. */
  self?: string;
  /** The response code and messages related to any requested transition. */
  transition?: NestedResponse;
  /** The response code and messages related to any requested watchers. */
  watchers?: NestedResponse;
}
/** Details about the issues created and the errors for requests that failed. */
export interface CreatedIssues {
  /** Error details for failed issue creation requests. */
  errors?: BulkOperationErrorResult[];
  /** Details of the issues created. */
  issues?: CreatedIssue[];
}
/** List issues archived within a specified date range. */
export interface DateRangeFilterRequest {
  /** List issues archived after a specified date, passed in the YYYY-MM-DD format. */
  dateAfter: string;
  /** List issues archived before a specified date provided in the YYYY-MM-DD format. */
  dateBefore: string;
}
export interface Error {
  count?: number;
  issueIdsOrKeys?: string[];
  message?: string;
}
export interface Errors {
  issueIsSubtask?: Error;
  issuesInArchivedProjects?: Error;
  issuesInUnlicensedProjects?: Error;
  issuesNotFound?: Error;
  userDoesNotHavePermission?: Error;
}
/** The response for status request for a running/completed export task. */
export interface ExportArchivedIssuesTaskProgressResponse {
  fileUrl?: string;
  payload?: string;
  progress?: number;
  status?: string;
  submittedTime?: string;
  taskId?: string;
}
/** The metadata describing an issue field for createmeta. */
export interface FieldCreateMetadata {
  /** The list of values allowed in the field. */
  allowedValues?: unknown[];
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl?: string;
  /** The configuration properties. */
  configuration?: {
    [key: string]: unknown;
  };
  /** The default value of the field. */
  defaultValue?: unknown;
  /** The field id. */
  fieldId: string;
  /** Whether the field has a default value. */
  hasDefaultValue?: boolean;
  /** The key of the field. */
  key: string;
  /** The name of the field. */
  name: string;
  /** The list of operations that can be performed on the field. */
  operations: string[];
  /** Whether the field is required. */
  required: boolean;
  /** The data type of the field. */
  schema: JsonTypeBean;
}
/** The metadata describing an issue field. */
export interface FieldMetadata {
  /** The list of values allowed in the field. */
  allowedValues?: unknown[];
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl?: string;
  /** The configuration properties. */
  configuration?: {
    [key: string]: unknown;
  };
  /** The default value of the field. */
  defaultValue?: unknown;
  /** Whether the field has a default value. */
  hasDefaultValue?: boolean;
  /** The key of the field. */
  key: string;
  /** The name of the field. */
  name: string;
  /** The list of operations that can be performed on the field. */
  operations: string[];
  /** Whether the field is required. */
  required: boolean;
  /** The data type of the field. */
  schema: JsonTypeBean;
}
/** Details of an operation to perform on a field. */
export interface FieldUpdateOperation {
  /**
   * The value to add to the field.
   *
   * @example
   * triaged
   */
  add?: unknown;
  /**
   * The field value to copy from another issue.
   *
   * @example
   * {
   *   "issuelinks": {
   *     "sourceIssues": [
   *       {
   *         "key": "FP-5"
   *       }
   *     ]
   *   }
   * }
   */
  copy?: unknown;
  /**
   * The value to edit in the field.
   *
   * @example
   * {
   *   "originalEstimate": "1w 1d",
   *   "remainingEstimate": "4d"
   * }
   */
  edit?: unknown;
  /**
   * The value to removed from the field.
   *
   * @example
   * blocker
   */
  remove?: unknown;
  /**
   * The value to set in the field.
   *
   * @example
   * A new summary
   */
  set?: unknown;
}
/** Details of issue history metadata. */
export interface HistoryMetadata extends Record<string, unknown> {
  /** The activity described in the history record. */
  activityDescription?: string;
  /** The key of the activity described in the history record. */
  activityDescriptionKey?: string;
  /** Details of the user whose action created the history record. */
  actor?: HistoryMetadataParticipant;
  /** Details of the cause that triggered the creation the history record. */
  cause?: HistoryMetadataParticipant;
  /** The description of the history record. */
  description?: string;
  /** The description key of the history record. */
  descriptionKey?: string;
  /** The description of the email address associated the history record. */
  emailDescription?: string;
  /** The description key of the email address associated the history record. */
  emailDescriptionKey?: string;
  /** Additional arbitrary information about the history record. */
  extraData?: {
    [key: string]: string;
  };
  /** Details of the system that generated the history record. */
  generator?: HistoryMetadataParticipant;
  /** The type of the history record. */
  type?: string;
}
/** Details of user or system associated with a issue history metadata item. */
export interface HistoryMetadataParticipant extends Record<string, unknown> {
  /** The URL to an avatar for the user or system associated with a history record. */
  avatarUrl?: string;
  /** The display name of the user or system associated with a history record. */
  displayName?: string;
  /**
   * The key of the display name of the user or system associated with a history
   * record.
   */
  displayNameKey?: string;
  /** The ID of the user or system associated with a history record. */
  id?: string;
  /** The type of the user or system associated with a history record. */
  type?: string;
  /** The URL of the user or system associated with a history record. */
  url?: string;
}
export interface IncludedFields {
  actuallyIncluded?: string[];
  excluded?: string[];
  included?: string[];
}
/** List of Issue Ids Or Keys that are to be archived or unarchived */
export interface IssueArchivalSyncRequest {
  issueIdsOrKeys?: string[];
}
/**
 * Number of archived/unarchived issues and list of errors that occurred during
 * the action, if any.
 */
export interface IssueArchivalSyncResponse {
  errors?: Errors;
  numberOfIssuesUpdated?: number;
}
/** List of changelogs that belong to single issue */
export interface IssueChangeLog {
  /** List of changelogs that belongs to given issueId. */
  changeHistories?: Changelog[];
  /** The ID of the issue. */
  issueId?: string;
}
/** A list of changelog IDs. */
export interface IssueChangelogIds {
  /** The list of changelog IDs. */
  changelogIds: number[];
}
/** The wrapper for the issue creation metadata for a list of projects. */
export interface IssueCreateMetadata {
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** List of projects and their issue creation metadata. */
  projects?: ProjectIssueCreateMetadata[];
}
/** Describes the error that occurred when retrieving data for a particular issue. */
export interface IssueError {
  /** The error that occurred when fetching this issue. */
  errorMessage?: string;
  /** The ID of the issue. */
  id?: string;
}
/** Details about an issue event. */
export interface IssueEvent {
  /** The ID of the event. */
  id?: number;
  /** The name of the event. */
  name?: string;
}
export interface IssueLimitReportResponseBean {
  /** A list of ids of issues approaching the limit and their field count */
  issuesApproachingLimit?: {
    [key: string]: {
      [key: string]: number;
    };
  };
  /** A list of ids of issues breaching the limit and their field count */
  issuesBreachingLimit?: {
    [key: string]: {
      [key: string]: number;
    };
  };
  /** The fields and their defined limits */
  limits?: {
    [key: string]: number;
  };
}
export interface IssuesUpdateBean extends Record<string, unknown> {
  issueUpdates?: IssueUpdateDetails[];
}
/** Details of an issue transition. */
export interface IssueTransition extends Record<string, unknown> {
  /** Expand options that include additional transition details in the response. */
  expand?: string;
  /**
   * Details of the fields associated with the issue transition screen. Use this
   * information to populate `fields` and `update` in a transition request.
   */
  fields?: {
    /** The metadata describing an issue field. */ [key: string]: FieldMetadata;
  };
  /** Whether there is a screen associated with the issue transition. */
  hasScreen?: boolean;
  /**
   * The ID of the issue transition. Required when specifying a transition to
   * undertake.
   */
  id?: string;
  /** Whether the transition is available to be performed. */
  isAvailable?: boolean;
  /** Whether the issue has to meet criteria before the issue transition is applied. */
  isConditional?: boolean;
  /**
   * Whether the issue transition is global, that is, the transition is applied to
   * issues regardless of their status.
   */
  isGlobal?: boolean;
  /** Whether this is the initial issue transition for the workflow. */
  isInitial?: boolean;
  looped?: boolean;
  /** The name of the issue transition. */
  name?: string;
  /** Details of the issue status after the transition. */
  to?: StatusDetails;
}
/** Details of the issue creation metadata for an issue type. */
export interface IssueTypeIssueCreateMetadata {
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** Unique ID for next-gen projects. */
  entityId?: string;
  /**
   * Expand options that include additional issue type metadata details in the
   * response.
   */
  expand?: string;
  /** List of the fields available when creating an issue for the issue type. */
  fields?: {
    /** The metadata describing an issue field. */ [key: string]: FieldMetadata;
  };
  /** Hierarchy level of the issue type. */
  hierarchyLevel?: number;
  /** The URL of the issue type's avatar. */
  iconUrl?: string;
  /** The ID of the issue type. */
  id?: string;
  /** The name of the issue type. */
  name?: string;
  /** Details of the next-gen projects the issue type is available in. */
  scope?: Scope;
  /** The URL of these issue type details. */
  self?: string;
  /** Whether this issue type is used to create subtasks. */
  subtask?: boolean;
}
/** Details of an issue update request. */
export interface IssueUpdateDetails extends Record<string, unknown> {
  /**
   * List of issue screen fields to update, specifying the sub-field to update and
   * its value for each field. This field provides a straightforward option when
   * setting a sub-field. When multiple sub-fields or other operations are required,
   * use `update`. Fields included in here cannot be included in `update`.
   */
  fields?: IssueBeanKnownUpdateFields & {
    [key: string]: unknown;
  };
  /** Additional issue history details. */
  historyMetadata?: HistoryMetadata;
  /** Details of issue properties to be add or update. */
  properties?: EntityProperty[];
  /**
   * Details of a transition. Required when performing a transition, optional when
   * creating or editing an issue.
   */
  transition?: IssueTransition;
  /**
   * A Map containing the field field name and a list of operations to perform on
   * the issue screen field. Note that fields included in here cannot be included in
   * `fields`.
   */
  update?: {
    [key: string]: FieldUpdateOperation[];
  };
}
/** A list of editable field details. */
export interface IssueUpdateMetadata extends Record<string, unknown> {
  fields?: {
    /** The metadata describing an issue field. */ [key: string]: FieldMetadata;
  };
}
/** Details a link group, which defines issue operations. */
export interface LinkGroup {
  groups?: LinkGroup[];
  /** Details about the operations available in this version. */
  header?: SimpleLink;
  id?: string;
  links?: SimpleLink[];
  styleClass?: string;
  weight?: number;
}
/** The response code and messages related to any requested watchers. */
export interface NestedResponse {
  /** Error messages from an operation. */
  errorCollection?: ErrorCollection;
  status?: number;
  warningCollection?: WarningCollection;
}
/** Details about a notification. */
export interface Notification extends Record<string, unknown> {
  /** The HTML body of the email notification for the issue. */
  htmlBody?: string;
  /** Restricts the notifications to users with the specified permissions. */
  restrict?: NotificationRecipientsRestrictions;
  /**
   * The subject of the email notification for the issue. If this is not specified,
   * then the subject is set to the issue key and summary.
   */
  subject?: string;
  /** The plain text body of the email notification for the issue. */
  textBody?: string;
  /** The recipients of the email notification for the issue. */
  to?: NotificationRecipients;
}
/** Details of the users and groups to receive the notification. */
export interface NotificationRecipients extends Record<string, unknown> {
  /** Whether the notification should be sent to the issue's assignees. */
  assignee?: boolean;
  /** List of groupIds to receive the notification. */
  groupIds?: string[];
  /** List of groups to receive the notification. */
  groups?: GroupName[];
  /** Whether the notification should be sent to the issue's reporter. */
  reporter?: boolean;
  /** List of users to receive the notification. */
  users?: UserDetails[];
  /** Whether the notification should be sent to the issue's voters. */
  voters?: boolean;
  /** Whether the notification should be sent to the issue's watchers. */
  watchers?: boolean;
}
/**
 * Details of the group membership or permissions needed to receive the
 * notification.
 */
export interface NotificationRecipientsRestrictions {
  /** List of groupId memberships required to receive the notification. */
  groupIds?: string[];
  /** List of group memberships required to receive the notification. */
  groups?: GroupName[];
  /** List of permissions required to receive the notification. */
  permissions?: RestrictedPermission[];
}
/** Details of the operations that can be performed on the issue. */
export interface Operations extends Record<string, unknown> {
  /** Details of the link groups defining issue operations. */
  linkGroups?: LinkGroup[];
}
/** A page of items. */
export interface PageBeanChangelog {
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
  values?: Changelog[];
}
/** A page of changelogs. */
export interface PageOfChangelogs {
  /** The list of changelogs. */
  histories?: Changelog[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
}
/** A page of CreateMetaIssueTypes. */
export interface PageOfCreateMetaIssueTypes extends Record<string, unknown> {
  createMetaIssueType?: IssueTypeIssueCreateMetadata[];
  /** The list of CreateMetaIssueType. */
  issueTypes?: IssueTypeIssueCreateMetadata[];
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The total number of items in all pages. */
  total?: number;
}
/** A page of CreateMetaIssueType with Field. */
export interface PageOfCreateMetaIssueTypeWithField extends Record<string, unknown> {
  /** The collection of FieldCreateMetaBeans. */
  fields?: FieldCreateMetadata[];
  /** The maximum number of items to return per page. */
  maxResults?: number;
  results?: FieldCreateMetadata[];
  /** The index of the first item returned. */
  startAt?: number;
  /** The total number of items in all pages. */
  total?: number;
}
/** Details of the issue creation metadata for a project. */
export interface ProjectIssueCreateMetadata {
  /** List of the project's avatars, returning the avatar size and associated URL. */
  avatarUrls?: AvatarUrlsBean;
  /**
   * Expand options that include additional project issue create metadata details in
   * the response.
   */
  expand?: string;
  /** The ID of the project. */
  id?: string;
  /** List of the issue types supported by the project. */
  issuetypes?: IssueTypeIssueCreateMetadata[];
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** The URL of the project. */
  self?: string;
}
/** Details of the permission. */
export interface RestrictedPermission extends Record<string, unknown> {
  /**
   * The ID of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-3-permissions-get) to get the list of permissions.
   */
  id?: string;
  /**
   * The key of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-3-permissions-get) to get the list of permissions.
   */
  key?: string;
}
/** List of issue transitions. */
export interface Transitions {
  /** Expand options that include additional transitions details in the response. */
  expand?: string;
  /** List of issue transitions. */
  transitions?: IssueTransition[];
}
export interface WarningCollection {
  warnings?: string[];
}

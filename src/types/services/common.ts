import type {
  ProjectInsight,
  Hierarchy,
  ProjectLandingPageInfo,
  ProjectPermissions,
  RoleActor,
  UserBean,
  VersionApprover,
  VersionIssuesStatus,
} from "./dashboards";
import type { UserPickerUser } from "./groupAndUserPicker";
import type { FoundGroup } from "./groups";
import type {
  SimpleListWrapperApplicationRole,
  SimpleListWrapperGroupName,
} from "./issueAttachments";
import type { PropertyKey } from "./issueCommentProperties";
import type { RemoveOptionFromIssuesResult } from "./issueCustomFieldOptions";
import type { ExpandPrioritySchemePage, IssueLink } from "./issueLinks";
import type { NotificationSchemeEvent } from "./issueNotificationSchemes";
import type { IssueTypeScreenScheme } from "./issueTypeScreenSchemes";
import type { PageOfWorklogs } from "./issueWorklogs";
import type {
  PageOfChangelogs,
  IssueUpdateMetadata,
  IncludedFields,
  Operations,
  IssueTransition,
} from "./issues";
import type { PermissionGrant } from "./permissionSchemes";
import type { AppWorkflowTransitionRule, WorkflowId } from "./workflowTransitionRules";
import type { ProjectUsage } from "./workflows";
/** Details of an application role. */
export interface ApplicationRole {
  /**
   * The groups that are granted default access for this application role. As a
   * group's name can change, use of `defaultGroupsDetails` is recommended to
   * identify a groups.
   */
  defaultGroups?: string[];
  /** The groups that are granted default access for this application role. */
  defaultGroupsDetails?: GroupName[];
  /** Deprecated. */
  defined?: boolean;
  /** The groups associated with the application role. */
  groupDetails?: GroupName[];
  /**
   * The groups associated with the application role. As a group's name can change,
   * use of `groupDetails` is recommended to identify a groups.
   */
  groups?: string[];
  hasUnlimitedSeats?: boolean;
  /** The key of the application role. */
  key?: string;
  /** The display name of the application role. */
  name?: string;
  /** The maximum count of users on your license. */
  numberOfSeats?: number;
  /** Indicates if the application role belongs to Jira platform (`jira-core`). */
  platform?: boolean;
  /** The count of users remaining on your license. */
  remainingSeats?: number;
  /**
   * Determines whether this application role should be selected by default on user
   * creation.
   */
  selectedByDefault?: boolean;
  /** The number of users counting against your license. */
  userCount?: number;
  /**
   * The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted
   * against your license.
   */
  userCountDescription?: string;
}
/** Details of an avatar. */
export interface Avatar extends Record<string, unknown> {
  /** The file name of the avatar icon. Returned for system avatars. */
  fileName?: string;
  /** The ID of the avatar. */
  id: string;
  /** Whether the avatar can be deleted. */
  isDeletable?: boolean;
  /** Whether the avatar is used in Jira. For example, shown as a project's avatar. */
  isSelected?: boolean;
  /** Whether the avatar is a system avatar. */
  isSystemAvatar?: boolean;
  /**
   * The owner of the avatar. For a system avatar the owner is null (and nothing is
   * returned). For non-system avatars this is the appropriate identifier, such as
   * the ID for a project or the account ID for a user.
   */
  owner?: string;
  /** The list of avatar icon URLs. */
  urls?: {
    [key: string]: string;
  };
}
/** The avatars of the user. */
export interface AvatarUrlsBean {
  /** The URL of the item's 16x16 pixel avatar. */
  "16x16"?: string;
  /** The URL of the item's 24x24 pixel avatar. */
  "24x24"?: string;
  /** The URL of the item's 32x32 pixel avatar. */
  "32x32"?: string;
  /** The URL of the item's 48x48 pixel avatar. */
  "48x48"?: string;
}
/** Details of an issue navigator column item. */
export interface ColumnItem {
  /** The issue navigator column label. */
  label?: string;
  /** The issue navigator column value. */
  value?: string;
}
export interface ColumnRequestBody {
  columns?: string[];
}
/** A comment. */
export interface Comment extends Record<string, unknown> {
  /** The ID of the user who created the comment. */
  author?: UserDetails;
  /**
   * The comment text in [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
   */
  body?: unknown;
  /** The date and time at which the comment was created. */
  created?: string;
  /** The ID of the comment. */
  id?: string;
  /**
   * Whether the comment was added from an email sent by a person who is not part of
   * the issue. See [Allow external emails to be added as comments on
   * issues](https://support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for
   * information on setting up this feature.
   */
  jsdAuthorCanSeeRequest?: boolean;
  /**
   * Whether the comment is visible in Jira Service Desk. Defaults to true when
   * comments are created in the Jira Cloud Platform. This includes when the site
   * doesn't use Jira Service Desk or the project isn't a Jira Service Desk project
   * and, therefore, there is no Jira Service Desk for the issue to be visible on.
   * To create a comment with its visibility in Jira Service Desk set to false, use
   * the Jira Service Desk REST API [Create request
   * comment](https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post)
   * operation.
   */
  jsdPublic?: boolean;
  /** A list of comment properties. Optional on create and update. */
  properties?: EntityProperty[];
  /** The rendered version of the comment. */
  renderedBody?: string;
  /** The URL of the comment. */
  self?: string;
  /** The ID of the user who updated the comment last. */
  updateAuthor?: UserDetails;
  /** The date and time at which the comment was updated last. */
  updated?: string;
  /**
   * The group or role to which this comment is visible. Optional on create and
   * update.
   */
  visibility?: Visibility;
}
/** Details about the default workflow. */
export interface DefaultWorkflow {
  /**
   * Whether a draft workflow scheme is created or updated when updating an active
   * workflow scheme. The draft is updated with the new default workflow. Defaults
   * to `false`.
   */
  updateDraftIfNeeded?: boolean;
  /** The name of the workflow to set as the default workflow. */
  workflow: string;
}
/** The current version details of this workflow scheme. */
export interface DocumentVersion {
  /** The version UUID. */
  id?: string;
  /** The version number. */
  versionNumber?: number;
}
/**
 * An entity property, for more information see [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 */
export interface EntityProperty {
  /** The key of the property. Required on create and update. */
  key?: string;
  /** The value of the property. Required on create and update. */
  value?: unknown;
}
/** Error messages from an operation. */
export interface ErrorCollection {
  /**
   * The list of error messages produced by this operation. For example, "input
   * parameter 'key' must be provided"
   */
  errorMessages?: string[];
  /**
   * The list of errors by parameter returned by the operation. For
   * example,"projectKey": "Project keys must start with an uppercase letter,
   * followed by one or more uppercase alphanumeric characters."
   */
  errors?: {
    [key: string]: string;
  };
  status?: number;
}
export interface ErrorMessage {
  message?: string;
}
/** Details about a field. */
export interface FieldDetails {
  /**
   * The names that can be used to reference the field in an advanced search. For
   * more information, see [Advanced searching - fields
   * reference](https://confluence.atlassian.com/x/gwORLQ).
   */
  clauseNames?: string[];
  /** Whether the field is a custom field. */
  custom?: boolean;
  /** The ID of the field. */
  id?: string;
  /** The key of the field. */
  key?: string;
  /** The name of the field. */
  name?: string;
  /** Whether the field can be used as a column on the issue navigator. */
  navigable?: boolean;
  /** Whether the content of the field can be used to order lists. */
  orderable?: boolean;
  /** The data schema for the field. */
  schema?: JsonTypeBean;
  /** The scope of the field. */
  scope?: Scope;
  /** Whether the content of the field can be searched. */
  searchable?: boolean;
}
/**
 * The list of groups found in a search, including header text (Showing X of Y
 * matching groups) and total of matched groups.
 */
export interface FoundGroups {
  groups?: FoundGroup[];
  /**
   * Header text indicating the number of groups in the response and the total
   * number of groups found in the search.
   */
  header?: string;
  /** The total number of groups found in the search. */
  total?: number;
}
/**
 * The list of users found in a search, including header text (Showing X of Y
 * matching users) and total of matched users.
 */
export interface FoundUsers {
  /**
   * Header text indicating the number of users in the response and the total number
   * of users found in the search.
   */
  header?: string;
  /** The total number of users found in the search. */
  total?: number;
  users?: UserPickerUser[];
}
/** Details about a group. */
export interface GroupName {
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian
   * products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*.
   */
  groupId?: string | null;
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
}
/** Details about an issue. */
export interface IssueBean {
  /** Details of changelogs associated with the issue. */
  changelog?: PageOfChangelogs;
  /** The metadata for the fields on the issue that can be amended. */
  editmeta?: IssueUpdateMetadata;
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  fields?: IssueBeanKnownFields & {
    [key: string]: unknown;
  };
  fieldsToInclude?: IncludedFields;
  /** The ID of the issue. */
  id: string;
  /** The key of the issue. */
  key?: string;
  /** The ID and name of each field present on the issue. */
  names?: {
    [key: string]: string;
  };
  /** The operations that can be performed on the issue. */
  operations?: Operations;
  /** Details of the issue properties identified in the request. */
  properties?: {
    [key: string]: unknown;
  };
  /** The rendered value of each field present on the issue. */
  renderedFields?: {
    [key: string]: unknown;
  };
  /** The schema describing each field present on the issue. */
  schema?: {
    /** The schema of a field. */ [key: string]: JsonTypeBean;
  };
  /** The URL of the issue details. */
  self?: string;
  /** The transitions that can be performed on the issue. */
  transitions?: IssueTransition[];
  /** The versions of each field on the issue. */
  versionedRepresentations?: {
    [key: string]: {
      [key: string]: unknown;
    };
  };
}

export interface IssueBeanKnownFields {
  statuscategorychangedate: string;
  issuetype: IssueTypeDetails;
  timespent?: number;
  project: ProjectDetails;
  resolution?: null;
  resolutiondate?: null;
  workratio: number;
  lastViewed?: null;
  created: string;
  priority: Priority;
  issuelinks: IssueLink[];
  assignee?: User | null;
  updated: string;
  status: StatusDetails;
  description: Description;
  summary: string;
  creator: User;
  subtasks: IssueBean[];
  reporter: User;
  duedate?: null;
  aggregatetimeoriginalestimate: number | null;
  aggregatetimeestimate: number | null;
  fixVersions?: Version[];
  worklog: PageOfWorklogs;
}

export interface IssueBeanKnownUpdateFields {
  statuscategorychangedate?: string;
  issuetype?: IssueTypeDetails;
  timespent?: number;
  project?: ProjectDetails;
  resolution?: null;
  resolutiondate?: null;
  workratio?: number;
  lastViewed?: null;
  created?: string;
  priority?: Priority;
  issuelinks?: IssueLink[];
  assignee?: User | null;
  updated?: string;
  status?: StatusDetails;
  description?: Description;
  summary?: string;
  creator?: User;
  subtasks?: IssueBean[];
  reporter?: User;
  duedate?: null;
  aggregatetimeoriginalestimate?: number | null;
  aggregatetimeestimate?: number | null;
  fixVersions?: Version[];
  worklog?: PageOfWorklogs;
}

export interface Description {
  type: string;
  version: number;
  content?: null[] | null;
}

export type IssueFieldKeys =
  | (keyof IssueBeanKnownUpdateFields)[]
  | string[]
  | "*navigable"[]
  | "*all"[];

/**
 * This object is used as follows:
 *
 *  *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it defines and
 * reports on the type of link between the issues. Find a list of issue link types
 * with [Get issue link types](#api-rest-api-3-issueLinkType-get).
 *  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it
 * defines and reports on issue link types.
 */
export interface IssueLinkType {
  /**
   * The ID of the issue link type and is used as follows:
   *
   *  *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type
   * of issue link. Required on create when `name` isn't provided. Otherwise, read
   * only.
   *  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is
   * read only.
   */
  id?: string;
  /**
   * The description of the issue link type inward link and is used as follows:
   *
   *  *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read
   * only.
   *  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is
   * required on create and optional on update. Otherwise, read only.
   */
  inward?: string;
  /**
   * The name of the issue link type and is used as follows:
   *
   *  *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type
   * of issue link. Required on create when `id` isn't provided. Otherwise, read
   * only.
   *  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is
   * required on create and optional on update. Otherwise, read only.
   */
  name?: string;
  /**
   * The description of the issue link type outward link and is used as follows:
   *
   *  *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read
   * only.
   *  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is
   * required on create and optional on update. Otherwise, read only.
   */
  outward?: string;
  /** The URL of the issue link type. Read only. */
  self?: string;
}
/** Details about an issue type. */
export interface IssueTypeDetails {
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** Unique ID for next-gen projects. */
  entityId?: string;
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
/** The list of issue type IDs. */
export interface IssueTypeIds {
  /** The list of issue type IDs. */
  issueTypeIds: string[];
}
/** Details about the mapping between issue types and a workflow. */
export interface IssueTypesWorkflowMapping {
  /** Whether the workflow is the default workflow for the workflow scheme. */
  defaultMapping?: boolean;
  /** The list of issue type IDs. */
  issueTypes?: string[];
  /**
   * Whether a draft workflow scheme is created or updated when updating an active
   * workflow scheme. The draft is updated with the new workflow-issue types
   * mapping. Defaults to `false`.
   */
  updateDraftIfNeeded?: boolean;
  /** The name of the workflow. Optional if updating the workflow-issue types mapping. */
  workflow?: string;
}
/** Details about the mapping between an issue type and a workflow. */
export interface IssueTypeWorkflowMapping {
  /**
   * The ID of the issue type. Not required if updating the issue type-workflow
   * mapping.
   */
  issueType?: string;
  /**
   * Set to true to create or update the draft of a workflow scheme and update the
   * mapping in the draft, when the workflow scheme cannot be edited. Defaults to
   * `false`. Only applicable when updating the workflow-issue types mapping.
   */
  updateDraftIfNeeded?: boolean;
  /** The name of the workflow. */
  workflow?: string;
}
export interface JsonNode {
  array?: boolean;
  bigDecimal?: boolean;
  bigInteger?: boolean;
  bigIntegerValue?: number;
  binary?: boolean;
  binaryValue?: string[];
  boolean?: boolean;
  booleanValue?: boolean;
  containerNode?: boolean;
  decimalValue?: number;
  double?: boolean;
  doubleValue?: number;
  elements?: {
    [key: string]: unknown;
  };
  fieldNames?: {
    [key: string]: unknown;
  };
  fields?: {
    [key: string]: unknown;
  };
  floatingPointNumber?: boolean;
  int?: boolean;
  intValue?: number;
  integralNumber?: boolean;
  long?: boolean;
  longValue?: number;
  missingNode?: boolean;
  null?: boolean;
  number?: boolean;
  numberType?: "INT" | "LONG" | "BIG_INTEGER" | "FLOAT" | "DOUBLE" | "BIG_DECIMAL";
  numberValue?: number;
  object?: boolean;
  pojo?: boolean;
  textValue?: string;
  textual?: boolean;
  valueAsBoolean?: boolean;
  valueAsDouble?: number;
  valueAsInt?: number;
  valueAsLong?: number;
  valueAsText?: string;
  valueNode?: boolean;
}
/** The schema of a field. */
export interface JsonTypeBean {
  /** If the field is a custom field, the configuration of the field. */
  configuration?: {
    [key: string]: unknown;
  };
  /** If the field is a custom field, the URI of the field. */
  custom?: string;
  /** If the field is a custom field, the custom ID of the field. */
  customId?: number;
  /** When the data type is an array, the name of the field items within the array. */
  items?: string;
  /** If the field is a system field, the name of the field. */
  system?: string;
  /** The data type of the field. */
  type: string;
}
/** Details about a notification scheme. */
export interface NotificationScheme {
  /** The description of the notification scheme. */
  description?: string;
  /**
   * Expand options that include additional notification scheme details in the
   * response.
   */
  expand?: string;
  /** The ID of the notification scheme. */
  id?: number;
  /** The name of the notification scheme. */
  name?: string;
  /** The notification events and associated recipients. */
  notificationSchemeEvents?: NotificationSchemeEvent[];
  /** The list of project IDs associated with the notification scheme. */
  projects?: number[];
  /** The scope of the notification scheme. */
  scope?: Scope;
  self?: string;
}
/** A page of items. */
export interface PageBeanIssueTypeScreenScheme {
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
  values?: IssueTypeScreenScheme[];
}
/** A page of items. */
export interface PageBeanProject {
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
  values?: Project[];
}
/** A page of items. */
export interface PageBeanProjectDetails {
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
  values?: ProjectDetails[];
}
/** A page of items. */
export interface PageBeanUser {
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
  values?: User[];
}
/**
 * Details of a user, group, field, or project role that holds a permission. See
 * [Holder object](../api-group-permission-schemes/#holder-object) in *Get all
 * permission schemes* for more information.
 */
export interface PermissionHolder {
  /**
   * Expand options that include additional permission holder details in the
   * response.
   */
  expand?: string;
  /**
   * As a group's name can change, use of `value` is recommended. The identifier
   * associated withthe `type` value that defines the holder of the permission.
   */
  parameter?: string;
  /** The type of permission holder. */
  type: string;
  /**
   * The identifier associated with the `type` value that defines the holder of the
   * permission.
   */
  value?: string;
}
/** Details of a permission scheme. */
export interface PermissionScheme extends Record<string, unknown> {
  /** A description for the permission scheme. */
  description?: string;
  /** The expand options available for the permission scheme. */
  expand?: string;
  /** The ID of the permission scheme. */
  id?: number;
  /** The name of the permission scheme. Must be unique. */
  name: string;
  /**
   * The permission scheme to create or update. See [About permission schemes and
   * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants)
   * for more information.
   */
  permissions?: PermissionGrant[];
  /** The scope of the permission scheme. */
  scope?: Scope;
  /** The URL of the permission scheme. */
  self?: string;
}
/** An issue priority. */
export interface Priority extends Record<string, unknown> {
  /**
   * The avatarId of the avatar for the issue priority. This parameter is nullable
   * and when set, this avatar references the universal avatar APIs.
   */
  avatarId?: number;
  /** The description of the issue priority. */
  description?: string;
  /** The URL of the icon for the issue priority. */
  iconUrl?: string;
  /** The ID of the issue priority. */
  id?: string;
  /** Whether this priority is the default. */
  isDefault?: boolean;
  /** The name of the issue priority. */
  name?: string;
  /** Priority schemes associated with the issue priority. */
  schemes?: ExpandPrioritySchemePage;
  /** The URL of the issue priority. */
  self?: string;
  /** The color used to indicate the issue priority. */
  statusColor?: string;
}
/** Details about a project. */
export interface Project {
  /** Whether the project is archived. */
  archived?: boolean;
  /** The user who archived the project. */
  archivedBy?: User;
  /** The date when the project was archived. */
  archivedDate?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: "PROJECT_LEAD" | "UNASSIGNED";
  /** The URLs of the project's avatars. */
  avatarUrls?: AvatarUrlsBean;
  /** List of the components contained in the project. */
  components?: ProjectComponent[];
  /** Whether the project is marked as deleted. */
  deleted?: boolean;
  /** The user who marked the project as deleted. */
  deletedBy?: User;
  /** The date when the project was marked as deleted. */
  deletedDate?: string;
  /** A brief description of the project. */
  description?: string;
  /** An email address associated with the project. */
  email?: string;
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** Whether the project is selected as a favorite. */
  favourite?: boolean;
  /** The ID of the project. */
  id?: string;
  /** Insights about the project. */
  insight?: ProjectInsight;
  /**
   * Whether the project is private from the user's perspective. This means the user
   * can't see the project or any associated issues.
   */
  isPrivate?: boolean;
  /** The issue type hierarchy for the project. */
  issueTypeHierarchy?: Hierarchy;
  /** List of the issue types available in the project. */
  issueTypes?: IssueTypeDetails[];
  /** The key of the project. */
  key?: string;
  /** The project landing page info. */
  landingPageInfo?: ProjectLandingPageInfo;
  /** The username of the project lead. */
  lead?: User;
  /** The name of the project. */
  name?: string;
  /** User permissions on the project */
  permissions?: ProjectPermissions;
  /** The category the project belongs to. */
  projectCategory?: ProjectCategory;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes)
   * of the project.
   */
  projectTypeKey?: "software" | "service_desk" | "business";
  /** Map of project properties */
  properties?: {
    [key: string]: unknown;
  };
  /** The date when the project is deleted permanently. */
  retentionTillDate?: string;
  /**
   * The name and self URL for each role defined in the project. For more
   * information, see [Create project role](#api-rest-api-3-role-post).
   */
  roles?: {
    [key: string]: string;
  };
  /** The URL of the project details. */
  self?: string;
  /** Whether the project is simplified. */
  simplified?: boolean;
  /** The type of the project. */
  style?: "classic" | "next-gen";
  /** A link to information about this project, such as project documentation. */
  url?: string;
  /** Unique ID for next-gen projects. */
  uuid?: string;
  /**
   * The versions defined in the project. For more information, see [Create
   * version](#api-rest-api-3-version-post).
   */
  versions?: Version[];
}
/** A project category. */
export interface ProjectCategory {
  /** The description of the project category. */
  description?: string;
  /** The ID of the project category. */
  id?: string;
  /** The name of the project category. Required on create, optional on update. */
  name?: string;
  /** The URL of the project category. */
  self?: string;
}
/** Details about a project component. */
export interface ProjectComponent {
  /**
   * Compass component's ID. Can't be updated. Not required for creating a Project
   * Component.
   */
  ari?: string;
  /**
   * The details of the user associated with `assigneeType`, if any. See
   * `realAssignee` for details of the user assigned to issues created with this
   * component.
   */
  assignee?: User;
  /**
   * The nominal user type used to determine the assignee for issues created with
   * this component. See `realAssigneeType` for details on how the type of the user,
   * and hence the user, assigned to issues is determined. Can take the following
   * values:
   *
   *  *  `PROJECT_LEAD` the assignee to any issues created with this component is
   * nominally the lead for the project the component is in.
   *  *  `COMPONENT_LEAD` the assignee to any issues created with this component is
   * nominally the lead for the component.
   *  *  `UNASSIGNED` an assignee is not set for issues created with this component.
   *  *  `PROJECT_DEFAULT` the assignee to any issues created with this component is
   * nominally the default assignee for the project that the component is in.
   *
   * Default value: `PROJECT_DEFAULT`.
   * Optional when creating or updating a component.
   */
  assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  /**
   * The description for the component. Optional when creating or updating a
   * component.
   */
  description?: string;
  /** The unique identifier for the component. */
  id?: string;
  /**
   * Whether a user is associated with `assigneeType`. For example, if the
   * `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set,
   * then `false` is returned.
   */
  isAssigneeTypeValid?: boolean;
  /** The user details for the component's lead user. */
  lead?: User;
  /**
   * The accountId of the component's lead user. The accountId uniquely identifies
   * the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
   */
  leadAccountId?: string;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  leadUserName?: string;
  /**
   * Compass component's metadata. Can't be updated. Not required for creating a
   * Project Component.
   */
  metadata?: {
    [key: string]: string;
  };
  /**
   * The unique name for the component in the project. Required when creating a
   * component. Optional when updating a component. The maximum length is 255
   * characters.
   */
  name?: string;
  /**
   * The key of the project the component is assigned to. Required when creating a
   * component. Can't be updated.
   */
  project?: string;
  /** The ID of the project the component is assigned to. */
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
  /** The URL of the component. */
  self?: string;
}
/** Details about a project. */
export interface ProjectDetails {
  /** The URLs of the project's avatars. */
  avatarUrls?: AvatarUrlsBean;
  /** The ID of the project. */
  id?: string;
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** The category the project belongs to. */
  projectCategory?: UpdatedProjectCategory;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes)
   * of the project.
   */
  projectTypeKey?: "software" | "service_desk" | "business";
  /** The URL of the project details. */
  self?: string;
  /** Whether or not the project is simplified. */
  simplified?: boolean;
}
/** Project ID details. */
export interface ProjectId {
  /** The ID of the project. */
  id: string;
}
/**
 * Deprecated. See the [deprecation
 * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
 * for details.
 *
 * Use the optional `workflows.usages` expand to get additional information about
 * the projects and issue types associated with the requested workflows.
 */
export interface ProjectIssueTypes {
  /** IDs of the issue types */
  issueTypes?: (string | null)[] | null;
  /** Project ID details. */
  project?: ProjectId | null;
}
/** Details about the roles in a project. */
export interface ProjectRole {
  /** The list of users who act in this role. */
  actors?: RoleActor[];
  /** Whether this role is the admin role for the project. */
  admin?: boolean;
  /** Whether the calling user is part of this role. */
  currentUserRole?: boolean;
  /** Whether this role is the default role for the project */
  default?: boolean;
  /** The description of the project role. */
  description?: string;
  /** The ID of the project role. */
  id?: number;
  /** The name of the project role. */
  name?: string;
  /** Whether the roles are configurable for this project. */
  roleConfigurable?: boolean;
  /**
   * The scope of the role. Indicated for roles associated with [next-gen
   * projects](https://confluence.atlassian.com/x/loMyO).
   */
  scope?: Scope;
  /** The URL the project role details. */
  self?: string;
  /** The translated name of the project role. */
  translatedName?: string;
}
/** A page of projects. */
export interface ProjectUsagePage {
  /** Page token for the next page of project usages. */
  nextPageToken?: string;
  /** The list of projects. */
  values?: ProjectUsage[];
}
/** List of property keys. */
export interface PropertyKeys {
  /** Property key details. */
  keys?: PropertyKey[];
}
/**
 * The projects the item is associated with. Indicated for items associated with
 * [next-gen projects](https://confluence.atlassian.com/x/loMyO).
 */
export interface Scope extends Record<string, unknown> {
  /** The project the item has scope in. */
  project?: ProjectDetails;
  /** The type of scope. */
  type?: "PROJECT" | "TEMPLATE";
}
/** A screen tab field. */
export interface ScreenableField {
  /** The ID of the screen tab field. */
  id?: string;
  /**
   * The name of the screen tab field. Required on create and update. The maximum
   * length is 255 characters.
   */
  name?: string;
}
/** A screen tab. */
export interface ScreenableTab {
  /** The ID of the screen tab. */
  id?: number;
  /** The name of the screen tab. The maximum length is 255 characters. */
  name: string;
}
/** Details of an issue level security item. */
export interface SecurityLevel {
  /** The description of the issue level security item. */
  description?: string;
  /** The ID of the issue level security item. */
  id?: string;
  /** Whether the issue level security item is the default. */
  isDefault?: boolean;
  /** The ID of the issue level security scheme. */
  issueSecuritySchemeId?: string;
  /** The name of the issue level security item. */
  name?: string;
  /** The URL of the issue level security item. */
  self?: string;
}
/** Details about a security scheme. */
export interface SecurityScheme {
  /** The ID of the default security level. */
  defaultSecurityLevelId?: number;
  /** The description of the issue security scheme. */
  description?: string;
  /** The ID of the issue security scheme. */
  id?: number;
  levels?: SecurityLevel[];
  /** The name of the issue security scheme. */
  name?: string;
  /** The URL of the issue security scheme. */
  self?: string;
}
/** Details of a share permission for the filter. */
export interface SharePermission {
  /**
   * The group that the filter is shared with. For a request, specify the `groupId`
   * or `name` property for the group. As a group's name can change, use of
   * `groupId` is recommended.
   */
  group?: GroupName;
  /** The unique identifier of the share permission. */
  id?: number;
  /**
   * The project that the filter is shared with. This is similar to the project
   * object returned by [Get project](#api-rest-api-3-project-projectIdOrKey-get)
   * but it contains a subset of the properties, which are: `self`, `id`, `key`,
   * `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`.
   * For a request, specify the `id` for the project.
   */
  project?: Project;
  /**
   * The project role that the filter is shared with.
   * For a request, specify the `id` for the role. You must also specify the
   * `project` object and `id` for the project that the role is in.
   */
  role?: ProjectRole;
  /**
   * The type of share permission:
   *
   *  *  `user` Shared with a user.
   *  *  `group` Shared with a group. If set in a request, then specify
   * `sharePermission.group` as well.
   *  *  `project` Shared with a project. If set in a request, then specify
   * `sharePermission.project` as well.
   *  *  `projectRole` Share with a project role in a project. This value is not
   * returned in responses. It is used in requests, where it needs to be specify
   * with `projectId` and `projectRoleId`.
   *  *  `global` Shared globally. If set in a request, no other `sharePermission`
   * properties need to be specified.
   *  *  `loggedin` Shared with all logged-in users. Note: This value is set in a
   * request by specifying `authenticated` as the `type`.
   *  *  `project-unknown` Shared with a project that the user does not have access
   * to. Cannot be set in a request.
   */
  type:
    | "user"
    | "group"
    | "project"
    | "projectRole"
    | "global"
    | "loggedin"
    | "authenticated"
    | "project-unknown";
  /**
   * The user account ID that the filter is shared with. For a request, specify the
   * `accountId` property for the user.
   */
  user?: UserBean;
}
/** Details about the operations available in this version. */
export interface SimpleLink {
  href?: string;
  iconClass?: string;
  id?: string;
  label?: string;
  styleClass?: string;
  title?: string;
  weight?: number;
}
/** A status category. */
export interface StatusCategory extends Record<string, unknown> {
  /** The name of the color used to represent the status category. */
  colorName?: string;
  /** The ID of the status category. */
  id?: number;
  /** The key of the status category. */
  key?: string;
  /** The name of the status category. */
  name?: string;
  /** The URL of the status category. */
  self?: string;
}
/** A status. */
export interface StatusDetails extends Record<string, unknown> {
  /** The description of the status. */
  description?: string;
  /** The URL of the icon used to represent the status. */
  iconUrl?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The scope of the field. */
  scope?: Scope;
  /** The URL of the status. */
  self?: string;
  /** The category assigned to the status. */
  statusCategory?: StatusCategory;
}
/** Details about a task. */
export interface TaskProgressBeanObject {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: number;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: number;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: unknown;
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: number;
  /** The status of the task. */
  status:
    | "ENQUEUED"
    | "RUNNING"
    | "COMPLETE"
    | "FAILED"
    | "CANCEL_REQUESTED"
    | "CANCELLED"
    | "DEAD";
  /** A timestamp recording when the task was submitted. */
  submitted: number;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
}
/** Details about a task. */
export interface TaskProgressBeanRemoveOptionFromIssuesResult {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: number;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: number;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: RemoveOptionFromIssuesResult;
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: number;
  /** The status of the task. */
  status:
    | "ENQUEUED"
    | "RUNNING"
    | "COMPLETE"
    | "FAILED"
    | "CANCEL_REQUESTED"
    | "CANCELLED"
    | "DEAD";
  /** A timestamp recording when the task was submitted. */
  submitted: number;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
}
/** Details of the time tracking configuration. */
export interface TimeTrackingConfiguration {
  /** The default unit of time applied to logged time. */
  defaultUnit: "minute" | "hour" | "day" | "week";
  /** The format that will appear on an issue's *Time Spent* field. */
  timeFormat: "pretty" | "days" | "hours";
  /** The number of days in a working week. */
  workingDaysPerWeek: number;
  /** The number of hours in a working day. */
  workingHoursPerDay: number;
}
/** A project category. */
export interface UpdatedProjectCategory {
  /** The name of the project category. */
  description?: string;
  /** The ID of the project category. */
  id?: string;
  /** The description of the project category. */
  name?: string;
  /** The URL of the project category. */
  self?: string;
}
/**
 * A user with details as permitted by the user's Atlassian Account privacy
 * settings. However, be aware of these exceptions:
 *
 *  *  User record deleted from Atlassian: This occurs as the result of a right to
 * be forgotten request. In this case, `displayName` provides an indication and
 * other parameters have default values or are blank (for example, email is blank).
 *  *  User record corrupted: This occurs as a results of events such as a server
 * import and can only happen to deleted users. In this case, `accountId` returns
 * *unknown* and all other parameters have fallback values.
 *  *  User record unavailable: This usually occurs due to an internal service
 * outage. In this case, all parameters have fallback values.
 */
export interface User {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in
   * requests.
   */
  accountId?: string;
  /**
   * The user account type. Can take the following values:
   *
   *  *  `atlassian` regular Atlassian user account
   *  *  `app` system account used for Connect applications and OAuth to represent
   * external systems
   *  *  `customer` Jira Service Desk account representing an external service desk
   */
  accountType?: "atlassian" | "app" | "customer" | "unknown";
  /** Whether the user is active. */
  active?: boolean;
  /** The application roles the user is assigned to. */
  applicationRoles?: SimpleListWrapperApplicationRole;
  /** The avatars of the user. */
  avatarUrls?: AvatarUrlsBean;
  /**
   * The display name of the user. Depending on the user’s privacy setting, this may
   * return an alternative value.
   */
  displayName?: string;
  /**
   * The email address of the user. Depending on the user’s privacy setting, this
   * may be returned as null.
   */
  emailAddress?: string;
  /** Expand options that include additional user details in the response. */
  expand?: string;
  /** The groups that the user belongs to. */
  groups?: SimpleListWrapperGroupName;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * The locale of the user. Depending on the user’s privacy setting, this may be
   * returned as null.
   */
  locale?: string;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /** The URL of the user. */
  self?: string;
  /**
   * The time zone specified in the user's profile. If the user's time zone is not
   * visible to the current user (due to user's profile setting), or if a time zone
   * has not been set, the instance's default time zone will be returned.
   */
  timeZone?: string;
}
/**
 * User details permitted by the user's Atlassian Account privacy settings.
 * However, be aware of these exceptions:
 *
 *  *  User record deleted from Atlassian: This occurs as the result of a right to
 * be forgotten request. In this case, `displayName` provides an indication and
 * other parameters have default values or are blank (for example, email is blank).
 *  *  User record corrupted: This occurs as a results of events such as a server
 * import and can only happen to deleted users. In this case, `accountId` returns
 * *unknown* and all other parameters have fallback values.
 *  *  User record unavailable: This usually occurs due to an internal service
 * outage. In this case, all parameters have fallback values.
 */
export interface UserDetails {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
   */
  accountId?: string;
  /**
   * The type of account represented by this user. This will be one of 'atlassian'
   * (normal users), 'app' (application user) or 'customer' (Jira Service Desk
   * customer user)
   */
  accountType?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The avatars of the user. */
  avatarUrls?: AvatarUrlsBean;
  /**
   * The display name of the user. Depending on the user’s privacy settings, this
   * may return an alternative value.
   */
  displayName?: string;
  /**
   * The email address of the user. Depending on the user’s privacy settings, this
   * may be returned as null.
   */
  emailAddress?: string;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /** The URL of the user. */
  self?: string;
  /**
   * The time zone specified in the user's profile. Depending on the user’s privacy
   * settings, this may be returned as null.
   */
  timeZone?: string;
}
/** Details about a project version. */
export interface Version {
  /**
   * If the expand option `approvers` is used, returns a list containing the
   * approvers for this version.
   */
  approvers?: VersionApprover[];
  /**
   * Indicates that the version is archived. Optional when creating or updating a
   * version.
   */
  archived?: boolean;
  /**
   * The description of the version. Optional when creating or updating a version.
   * The maximum size is 16,384 bytes.
   */
  description?: string;
  /**
   * If the expand option `driver` is used, returns the Atlassian account ID of the
   * driver.
   */
  driver?: string;
  /**
   * Use [expand](em>#expansion) to include additional information about version in
   * the response. This parameter accepts a comma-separated list. Expand options
   * include:
   *
   *  *  `operations` Returns the list of operations available for this version.
   *  *  `issuesstatus` Returns the count of issues in this version for each of the
   * status categories *to do*, *in progress*, *done*, and *unmapped*. The
   * *unmapped* property contains a count of issues with a status other than *to
   * do*, *in progress*, and *done*.
   *  *  `driver` Returns the Atlassian account ID of the version driver.
   *  *  `approvers` Returns a list containing approvers for this version.
   *
   * Optional for create and update.
   */
  expand?: string;
  /** The ID of the version. */
  id?: string;
  /**
   * If the expand option `issuesstatus` is used, returns the count of issues in
   * this version for each of the status categories *to do*, *in progress*, *done*,
   * and *unmapped*. The *unmapped* property contains a count of issues with a
   * status other than *to do*, *in progress*, and *done*.
   */
  issuesStatusForFixVersion?: VersionIssuesStatus;
  /**
   * The URL of the self link to the version to which all unfixed issues are moved
   * when a version is released. Not applicable when creating a version. Optional
   * when updating a version.
   */
  moveUnfixedIssuesTo?: string;
  /**
   * The unique name of the version. Required when creating a version. Optional when
   * updating a version. The maximum length is 255 characters.
   */
  name?: string;
  /**
   * If the expand option `operations` is used, returns the list of operations
   * available for this version.
   */
  operations?: SimpleLink[];
  /** Indicates that the version is overdue. */
  overdue?: boolean;
  /** Deprecated. Use `projectId`. */
  project?: string;
  /**
   * The ID of the project to which this version is attached. Required when creating
   * a version. Not applicable when updating a version.
   */
  projectId?: number;
  /**
   * The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd).
   * Optional when creating or updating a version.
   */
  releaseDate?: string;
  /**
   * Indicates that the version is released. If the version is released a request to
   * release again is ignored. Not applicable when creating a version. Optional when
   * updating a version.
   */
  released?: boolean;
  /** The URL of the version. */
  self?: string;
  /**
   * The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd).
   * Optional when creating or updating a version.
   */
  startDate?: string;
  /**
   * The date on which work on this version is expected to finish, expressed in the
   * instance's *Day/Month/Year Format* date format.
   */
  userReleaseDate?: string;
  /**
   * The date on which work on this version is expected to start, expressed in the
   * instance's *Day/Month/Year Format* date format.
   */
  userStartDate?: string;
}
/** The group or role to which this item is visible. */
export interface Visibility extends Record<string, unknown> {
  /**
   * The ID of the group or the name of the role that visibility of this item is
   * restricted to.
   */
  identifier?: string | null;
  /** Whether visibility of this item is restricted to a group or role. */
  type?: "group" | "role";
  /**
   * The name of the group or role that visibility of this item is restricted to.
   * Please note that the name of a group is mutable, to reliably identify a group
   * use `identifier`.
   */
  value?: string;
}
/** Details about a workflow scheme. */
export interface WorkflowScheme {
  /**
   * The name of the default workflow for the workflow scheme. The default workflow
   * has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow`
   * is not specified when creating a workflow scheme, it is set to *Jira Workflow
   * (jira)*.
   */
  defaultWorkflow?: string;
  /** The description of the workflow scheme. */
  description?: string;
  /** Whether the workflow scheme is a draft or not. */
  draft?: boolean;
  /** The ID of the workflow scheme. */
  id?: number;
  /**
   * The issue type to workflow mappings, where each mapping is an issue type ID and
   * workflow name pair. Note that an issue type can only be mapped to one workflow
   * in a workflow scheme.
   */
  issueTypeMappings?: {
    [key: string]: string;
  };
  /** The issue types available in Jira. */
  issueTypes?: {
    /** Details about an issue type. */ [key: string]: IssueTypeDetails;
  };
  /**
   * The date-time that the draft workflow scheme was last modified. A modification
   * is a change to the issue type-project mappings only. This property does not
   * apply to non-draft workflows.
   */
  lastModified?: string;
  /**
   * The user that last modified the draft workflow scheme. A modification is a
   * change to the issue type-project mappings only. This property does not apply to
   * non-draft workflows.
   */
  lastModifiedUser?: User;
  /**
   * The name of the workflow scheme. The name must be unique. The maximum length is
   * 255 characters. Required when creating a workflow scheme.
   */
  name?: string;
  /**
   * For draft workflow schemes, this property is the name of the default workflow
   * for the original workflow scheme. The default workflow has *All Unassigned
   * Issue Types* assigned to it in Jira.
   */
  originalDefaultWorkflow?: string;
  /**
   * For draft workflow schemes, this property is the issue type to workflow
   * mappings for the original workflow scheme, where each mapping is an issue type
   * ID and workflow name pair. Note that an issue type can only be mapped to one
   * workflow in a workflow scheme.
   */
  originalIssueTypeMappings?: {
    [key: string]: string;
  };
  self?: string;
  /**
   * Whether to create or update a draft workflow scheme when updating an active
   * workflow scheme. An active workflow scheme is a workflow scheme that is used by
   * at least one project. The following examples show how this property works:
   *
   *  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`:
   * If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow
   * scheme is created.
   *  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`:
   * An error is returned, as active workflow schemes cannot be updated.
   *  *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to
   * `true`: The workflow scheme is updated, as inactive workflow schemes do not
   * require drafts to update.
   *
   * Defaults to `false`.
   */
  updateDraftIfNeeded?: boolean;
}
/** The scope of the workflow. */
export interface WorkflowScope {
  /** Project ID details. */
  project?: ProjectId | null;
  /**
   * The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT`
   * for team-managed projects.
   */
  type?: "PROJECT" | "GLOBAL";
}
/** A workflow with transition rules. */
export interface WorkflowTransitionRules {
  /** The list of conditions within the workflow. */
  conditions?: AppWorkflowTransitionRule[];
  /** The list of post functions within the workflow. */
  postFunctions?: AppWorkflowTransitionRule[];
  /** The list of validators within the workflow. */
  validators?: AppWorkflowTransitionRule[];
  /** Properties that identify a workflow. */
  workflowId: WorkflowId;
}

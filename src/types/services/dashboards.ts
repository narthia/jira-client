import type { SharePermission } from "./common";
/** The details of the available dashboard gadget. */
export interface AvailableDashboardGadget {
  /** The module key of the gadget type. */
  moduleKey?: string;
  /** The title of the gadget. */
  title: string;
  /** The URI of the gadget type. */
  uri?: string;
}
/** The list of available gadgets. */
export interface AvailableDashboardGadgetsResponse {
  /** The list of available gadgets. */
  gadgets: AvailableDashboardGadget[];
}
/** Details for changing owners of shareable entities */
export interface BulkChangeOwnerDetails {
  /** Whether the name is fixed automatically if it's duplicated after changing owner. */
  autofixName: boolean;
  /** The account id of the new owner. */
  newOwner: string;
}
/** Errors of bulk edit action. */
export interface BulkEditActionError {
  /** The error messages. */
  errorMessages: string[];
  /** The errors. */
  errors: {
    [key: string]: string;
  };
}
/** Details of a request to bulk edit shareable entity. */
export interface BulkEditShareableEntityRequest {
  /** Allowed action for bulk edit shareable entity */
  action: "changeOwner" | "changePermission" | "addPermission" | "removePermission";
  /** The details of change owner action. */
  changeOwnerDetails?: BulkChangeOwnerDetails;
  /** The id list of shareable entities to be changed. */
  entityIds: number[];
  /**
   * Whether the actions are executed by users with Administer Jira global
   * permission.
   */
  extendAdminPermissions?: boolean;
  /** The permission details to be changed. */
  permissionDetails?: PermissionDetails;
}
/** Details of a request to bulk edit shareable entity. */
export interface BulkEditShareableEntityResponse {
  /** Allowed action for bulk edit shareable entity */
  action: "changeOwner" | "changePermission" | "addPermission" | "removePermission";
  /** The mapping dashboard id to errors if any. */
  entityErrors?: {
    /** Errors of bulk edit action. */ [key: string]: BulkEditActionError;
  };
}
/** Details of a dashboard. */
export interface Dashboard {
  /** The automatic refresh interval for the dashboard in milliseconds. */
  automaticRefreshMs?: number;
  description?: string;
  /** The details of any edit share permissions for the dashboard. */
  editPermissions?: SharePermission[];
  /** The ID of the dashboard. */
  id?: string;
  /** Whether the dashboard is selected as a favorite by the user. */
  isFavourite?: boolean;
  /** Whether the current user has permission to edit the dashboard. */
  isWritable?: boolean;
  /** The name of the dashboard. */
  name?: string;
  /** The owner of the dashboard. */
  owner?: UserBean;
  /** The number of users who have this dashboard as a favorite. */
  popularity?: number;
  /** The rank of this dashboard. */
  rank?: number;
  /** The URL of these dashboard details. */
  self?: string;
  /** The details of any view share permissions for the dashboard. */
  sharePermissions?: SharePermission[];
  /** Whether the current dashboard is system dashboard. */
  systemDashboard?: boolean;
  /** The URL of the dashboard. */
  view?: string;
}
/** Details of a dashboard. */
export interface DashboardDetails {
  /** The description of the dashboard. */
  description?: string;
  /** The edit permissions for the dashboard. */
  editPermissions: SharePermission[];
  /** The name of the dashboard. */
  name: string;
  /** The share permissions for the dashboard. */
  sharePermissions: SharePermission[];
}
/** Details of a gadget. */
export interface DashboardGadget {
  /**
   * The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`,
   * `cyan`, `purple`, `gray`, or `white`.
   */
  color: "blue" | "red" | "yellow" | "green" | "cyan" | "purple" | "gray" | "white";
  /** The ID of the gadget instance. */
  id: number;
  /** The module key of the gadget type. */
  moduleKey?: string;
  /** The position of the gadget. */
  position: DashboardGadgetPosition;
  /** The title of the gadget. */
  title: string;
  /** The URI of the gadget type. */
  uri?: string;
}
/** Details of a gadget position. */
export interface DashboardGadgetPosition {
  "The column position of the gadget.": number;
  "The row position of the gadget.": number;
}
/** The list of gadgets on the dashboard. */
export interface DashboardGadgetResponse {
  /** The list of gadgets. */
  gadgets: DashboardGadget[];
}
/** Details of the settings for a dashboard gadget. */
export interface DashboardGadgetSettings {
  /**
   * The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`,
   * `cyan`, `purple`, `gray`, or `white`.
   */
  color?: string;
  /**
   * Whether to ignore the validation of module key and URI. For example, when a
   * gadget is created that is a part of an application that isn't installed.
   */
  ignoreUriAndModuleKeyValidation?: boolean;
  /** The module key of the gadget type. Can't be provided with `uri`. */
  moduleKey?: string;
  /**
   * The position of the gadget. When the gadget is placed into the position, other
   * gadgets in the same column are moved down to accommodate it.
   */
  position?: DashboardGadgetPosition;
  /** The title of the gadget. */
  title?: string;
  /** The URI of the gadget type. Can't be provided with `moduleKey`. */
  uri?: string;
}
/** The details of the gadget to update. */
export interface DashboardGadgetUpdateRequest {
  /**
   * The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`,
   * `cyan`, `purple`, `gray`, or `white`.
   */
  color?: string;
  /** The position of the gadget. */
  position?: DashboardGadgetPosition;
  /** The title of the gadget. */
  title?: string;
}
/** The project issue type hierarchy. */
export interface Hierarchy {
  /**
   * The ID of the base level. This property is deprecated, see [Change notice:
   * Removing hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  baseLevelId?: number;
  /** Details about the hierarchy level. */
  levels?: SimplifiedHierarchyLevel[];
}
/** A page of items. */
export interface PageBeanDashboard {
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
  values?: Dashboard[];
}
/** A page containing dashboard details. */
export interface PageOfDashboards {
  /** List of dashboards. */
  dashboards?: Dashboard[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The URL of the next page of results, if any. */
  next?: string;
  /** The URL of the previous page of results, if any. */
  prev?: string;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
}
/** Details for permissions of shareable entities */
export interface PermissionDetails {
  /** The edit permissions for the shareable entities. */
  editPermissions: SharePermission[];
  /** The share permissions for the shareable entities. */
  sharePermissions: SharePermission[];
}
/** Additional details about a project. */
export interface ProjectInsight {
  /** The last issue update time. */
  lastIssueUpdateTime?: string;
  /** Total issue count. */
  totalIssueCount?: number;
}
/** The project landing page info. */
export interface ProjectLandingPageInfo {
  attributes?: {
    [key: string]: string;
  };
  boardId?: number;
  boardName?: string;
  projectKey?: string;
  projectType?: string;
  queueCategory?: string;
  queueId?: number;
  queueName?: string;
  simpleBoard?: boolean;
  simplified?: boolean;
  url?: string;
}
/** Permissions which a user has on a project. */
export interface ProjectPermissions {
  /** Whether the logged user can edit the project. */
  canEdit?: boolean;
}
/** Details of the group associated with the role. */
export interface ProjectRoleGroup {
  /** The display name of the group. */
  displayName?: string;
  /** The ID of the group. */
  groupId?: string;
  /**
   * The name of the group. As a group's name can change, use of `groupId` is
   * recommended to identify the group.
   */
  name?: string;
}
/** Details of the user associated with the role. */
export interface ProjectRoleUser {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown*
   * if the record is deleted and corrupted, for example, as the result of a server
   * import.
   */
  accountId?: string;
}
/** Details about a user assigned to a project role. */
export interface RoleActor {
  actorGroup?: ProjectRoleGroup;
  actorUser?: ProjectRoleUser;
  /** The avatar of the role actor. */
  avatarUrl?: string;
  /**
   * The display name of the role actor. For users, depending on the user’s privacy
   * setting, this may return an alternative value for the user's name.
   */
  displayName?: string;
  /** The ID of the role actor. */
  id?: number;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /** The type of role actor. */
  type?: "atlassian-group-role-actor" | "atlassian-user-role-actor";
}
export interface SimplifiedHierarchyLevel {
  /**
   * The ID of the level above this one in the hierarchy. This property is
   * deprecated, see [Change notice: Removing hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  aboveLevelId?: number;
  /**
   * The ID of the level below this one in the hierarchy. This property is
   * deprecated, see [Change notice: Removing hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  belowLevelId?: number;
  /**
   * The external UUID of the hierarchy level. This property is deprecated, see
   * [Change notice: Removing hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  externalUuid?: string;
  hierarchyLevelNumber?: number;
  /**
   * The ID of the hierarchy level. This property is deprecated, see [Change notice:
   * Removing hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  id?: number;
  /** The issue types available in this hierarchy level. */
  issueTypeIds?: number[];
  /** The level of this item in the hierarchy. */
  level?: number;
  /** The name of this hierarchy level. */
  name?: string;
  /**
   * The ID of the project configuration. This property is deprecated, see [Change
   * oticen: Removing hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  projectConfigurationId?: number;
}
/**
 * The user account ID that the filter is shared with. For a request, specify the
 * `accountId` property for the user.
 */
export interface UserBean {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
   */
  accountId?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The avatars of the user. */
  avatarUrls?: UserBeanAvatarUrls;
  /**
   * The display name of the user. Depending on the user’s privacy setting, this may
   * return an alternative value.
   */
  displayName?: string;
  /**
   * This property is deprecated in favor of `accountId` because of privacy changes.
   * See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   * The key of the user.
   */
  key?: string;
  /**
   * This property is deprecated in favor of `accountId` because of privacy changes.
   * See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   * The username of the user.
   */
  name?: string;
  /** The URL of the user. */
  self?: string;
}
/** The avatars of the user. */
export interface UserBeanAvatarUrls {
  /** The URL of the user's 16x16 pixel avatar. */
  "16x16"?: string;
  /** The URL of the user's 24x24 pixel avatar. */
  "24x24"?: string;
  /** The URL of the user's 32x32 pixel avatar. */
  "32x32"?: string;
  /** The URL of the user's 48x48 pixel avatar. */
  "48x48"?: string;
}
/** Contains details about a version approver. */
export interface VersionApprover extends Record<string, unknown> {
  /** The Atlassian account ID of the approver. */
  accountId?: string;
  /** A description of why the user is declining the approval. */
  declineReason?: string;
  /** A description of what the user is approving within the specified version. */
  description?: string;
  /** The status of the approval, which can be *PENDING*, *APPROVED*, or *DECLINED* */
  status?: string;
}
/** Counts of the number of issues in various statuses. */
export interface VersionIssuesStatus extends Record<string, unknown> {
  /** Count of issues with status *done*. */
  done?: number;
  /** Count of issues with status *in progress*. */
  inProgress?: number;
  /** Count of issues with status *to do*. */
  toDo?: number;
  /** Count of issues with a status other than *to do*, *in progress*, and *done*. */
  unmapped?: number;
}

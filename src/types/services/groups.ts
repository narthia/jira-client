import type { UserDetails } from "./common";
export interface AddGroupBean extends Record<string, unknown> {
  /** The name of the group. */
  name: string;
}
/** A group found in a search. */
export interface FoundGroup {
  /** Avatar url for the group/team if present. */
  avatarUrl?: string;
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian
   * products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*.
   */
  groupId?: string;
  /** The group name with the matched query string highlighted with the HTML bold tag. */
  html?: string;
  labels?: GroupLabel[];
  /**
   * Describes who/how the team is managed. The possible values are
   * \* external - when team is synced from an external directory like SCIM or HRIS,
   * and team members cannot be modified.
   * \* admins - when a team is managed by an admin (team members can only be
   * modified by admins).
   * \* team-members - managed by existing team members, new members need to be
   * invited to join.
   * \* open - anyone can join or modify this team.
   */
  managedBy?: "EXTERNAL" | "ADMINS" | "TEAM_MEMBERS" | "OPEN";
  /**
   * The name of the group. The name of a group is mutable, to reliably identify a
   * group use ``groupId`.`
   */
  name?: string;
  /**
   * Describes the type of group. The possible values are
   * \* team-collaboration - A platform team managed in people directory.
   * \* userbase-group - a group of users created in adminhub.
   * \* admin-oversight - currently unused.
   */
  usageType?: "USERBASE_GROUP" | "TEAM_COLLABORATION" | "ADMIN_OVERSIGHT";
}
export interface Group {
  /** Expand options that include additional group details in the response. */
  expand?: string;
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian
   * products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*.
   */
  groupId?: string | null;
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
  /**
   * A paginated list of the users that are members of the group. A maximum of 50
   * users is returned in the list, to access additional users append
   * `[start-index:end-index]` to the expand request. For example, to access the
   * next 50 users, use`?expand=users[51:100]`.
   */
  users?: PagedListUserDetailsApplicationUser;
}
/** Details about a group. */
export interface GroupDetails {
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian
   * products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*.
   */
  groupId?: string | null;
  /** The name of the group. */
  name?: string;
}
/** A group label. */
export interface GroupLabel {
  /** The group label name. */
  text?: string;
  /** The title of the group label. */
  title?: string;
  /** The type of the group label. */
  type?: "ADMIN" | "SINGLE" | "MULTIPLE";
}
/** A page of items. */
export interface PageBeanGroupDetails {
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
  values?: GroupDetails[];
}
/** A page of items. */
export interface PageBeanUserDetails {
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
  values?: UserDetails[];
}
/**
 * A paged list. To access additional details append `[start-index:end-index]` to
 * the expand request. For example, `?expand=sharedUsers[10:40]` returns a list
 * starting at item 10 and finishing at item 40.
 */
export interface PagedListUserDetailsApplicationUser {
  /** The index of the last item returned on the page. */
  "end-index"?: number;
  /** The list of items. */
  items?: UserDetails[];
  /** The maximum number of results that could be on the page. */
  "max-results"?: number;
  /** The number of items on the page. */
  size?: number;
  /** The index of the first item returned on the page. */
  "start-index"?: number;
}
export interface UpdateUserToGroupBean extends Record<string, unknown> {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
   */
  accountId?: string;
  /**
   * This property is no longer available. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
}

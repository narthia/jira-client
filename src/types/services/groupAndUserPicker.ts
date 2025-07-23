import type { FoundGroups, FoundUsers } from "./common";
/** List of users and groups found in a search. */
export interface FoundUsersAndGroups {
  /**
   * The list of groups found in a search, including header text (Showing X of Y
   * matching groups) and total of matched groups.
   */
  groups?: FoundGroups;
  /**
   * The list of users found in a search, including header text (Showing X of Y
   * matching users) and total of matched users.
   */
  users?: FoundUsers;
}
/** A user found in a search. */
export interface UserPickerUser {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
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
  /** The avatar URL of the user. */
  avatarUrl?: string;
  /**
   * The display name of the user. Depending on the user’s privacy setting, this may
   * be returned as null.
   */
  displayName?: string;
  /**
   * The display name, email address, and key of the user with the matched query
   * string highlighted with the HTML bold tag.
   */
  html?: string;
  /**
   * This property is no longer available. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * This property is no longer available . See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
}

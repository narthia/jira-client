/** The user details. */
export interface NewUserDetails extends Record<string, unknown> {
  /** Deprecated, do not use. */
  applicationKeys?: string[];
  /**
   * This property is no longer available. If the user has an Atlassian account,
   * their display name is not changed. If the user does not have an Atlassian
   * account, they are sent an email asking them set up an account.
   */
  displayName?: string;
  /** The email address for the user. */
  emailAddress: string;
  /**
   * This property is no longer available. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * This property is no longer available. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /**
   * This property is no longer available. If the user has an Atlassian account,
   * their password is not changed. If the user does not have an Atlassian account,
   * they are sent an email asking them set up an account.
   */
  password?: string;
  /**
   * Products the new user has access to. Valid products are: jira-core,
   * jira-servicedesk, jira-product-discovery, jira-software. To create a user
   * without product access, set this field to be an empty array.
   */
  products: string[];
  /** The URL of the user. */
  self?: string;
}
export interface UnrestrictedUserEmail extends Record<string, unknown> {
  /** The accountId of the user */
  accountId?: string;
  /** The email of the user */
  email?: string;
}
export interface UserColumnRequestBody {
  columns?: string[];
}
export interface UserMigrationBean {
  accountId?: string;
  key?: string;
  username?: string;
}

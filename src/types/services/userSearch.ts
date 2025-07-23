/** A page of items. */
export interface PageBeanUserKey {
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
  values?: UserKey[];
}
/** List of user account IDs. */
export interface UserKey {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown*
   * if the record is deleted and corrupted, for example, as the result of a server
   * import.
   */
  accountId?: string;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
}

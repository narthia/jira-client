import type { SharePermission, User, GroupName } from "./common";
/** The account ID of the new owner. */
export interface ChangeFilterOwner {
  /** The account ID of the new owner. */
  accountId: string;
}
/** Details about a filter. */
export interface Filter {
  /**
   * \[Experimental\] Approximate last used time. Returns the date and time when the
   * filter was last used. Returns `null` if the filter hasn't been used after
   * tracking was enabled. For performance reasons, timestamps aren't updated in
   * real time and therefore may not be exactly accurate.
   */
  approximateLastUsed?: string;
  /** A description of the filter. */
  description?: string;
  /** The groups and projects that can edit the filter. */
  editPermissions?: SharePermission[];
  /** Whether the filter is selected as a favorite. */
  favourite?: boolean;
  /**
   * The count of how many users have selected this filter as a favorite, including
   * the filter owner.
   */
  favouritedCount?: number;
  /** The unique identifier for the filter. */
  id?: string;
  /** The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*. */
  jql?: string;
  /** The name of the filter. Must be unique. */
  name: string;
  /**
   * The user who owns the filter. This is defaulted to the creator of the filter,
   * however Jira administrators can change the owner of a shared filter in the
   * admin settings.
   */
  owner?: User;
  /**
   * A URL to view the filter results in Jira, using the [Search for issues using
   * JQL](#api-rest-api-3-filter-search-get) operation with the filter's JQL string
   * to return the filter results. For example,
   * *https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*.
   */
  searchUrl?: string;
  /** The URL of the filter. */
  self?: string;
  /** The groups and projects that the filter is shared with. */
  sharePermissions?: SharePermission[];
  /**
   * A paginated list of the users that the filter is shared with. This includes
   * users that are members of the groups or can browse the projects that the filter
   * is shared with.
   */
  sharedUsers?: UserList;
  /** A paginated list of the users that are subscribed to the filter. */
  subscriptions?: FilterSubscriptionsList;
  /**
   * A URL to view the filter results in Jira, using the ID of the filter. For
   * example, *https://your-domain.atlassian.net/issues/?filter=10100*.
   */
  viewUrl?: string;
}
/** Details of a filter. */
export interface FilterDetails {
  /**
   * \[Experimental\] Approximate last used time. Returns the date and time when the
   * filter was last used. Returns `null` if the filter hasn't been used after
   * tracking was enabled. For performance reasons, timestamps aren't updated in
   * real time and therefore may not be exactly accurate.
   */
  approximateLastUsed?: string;
  /** The description of the filter. */
  description?: string;
  /**
   * The groups and projects that can edit the filter. This can be specified when
   * updating a filter, but not when creating a filter.
   */
  editPermissions?: SharePermission[];
  /** Expand options that include additional filter details in the response. */
  expand?: string;
  /**
   * Whether the filter is selected as a favorite by any users, not including the
   * filter owner.
   */
  favourite?: boolean;
  /**
   * The count of how many users have selected this filter as a favorite, including
   * the filter owner.
   */
  favouritedCount?: number;
  /** The unique identifier for the filter. */
  id?: string;
  /** The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*. */
  jql?: string;
  /** The name of the filter. */
  name: string;
  /**
   * The user who owns the filter. Defaults to the creator of the filter, however,
   * Jira administrators can change the owner of a shared filter in the admin
   * settings.
   */
  owner?: User;
  /**
   * A URL to view the filter results in Jira, using the [Search for issues using
   * JQL](#api-rest-api-3-filter-search-get) operation with the filter's JQL string
   * to return the filter results. For example,
   * *https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*.
   */
  searchUrl?: string;
  /** The URL of the filter. */
  self?: string;
  /**
   * The groups and projects that the filter is shared with. This can be specified
   * when updating a filter, but not when creating a filter.
   */
  sharePermissions?: SharePermission[];
  /** The users that are subscribed to the filter. */
  subscriptions?: FilterSubscription[];
  /**
   * A URL to view the filter results in Jira, using the ID of the filter. For
   * example, *https://your-domain.atlassian.net/issues/?filter=10100*.
   */
  viewUrl?: string;
}
/** Details of a user or group subscribing to a filter. */
export interface FilterSubscription {
  /** The group subscribing to filter. */
  group?: GroupName;
  /** The ID of the filter subscription. */
  id?: number;
  /** The user subscribing to filter. */
  user?: User;
}
/** A paginated list of subscriptions to a filter. */
export interface FilterSubscriptionsList {
  /** The index of the last item returned on the page. */
  "end-index"?: number;
  /** The list of items. */
  items?: FilterSubscription[];
  /** The maximum number of results that could be on the page. */
  "max-results"?: number;
  /** The number of items on the page. */
  size?: number;
  /** The index of the first item returned on the page. */
  "start-index"?: number;
}
/** A page of items. */
export interface PageBeanFilterDetails {
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
  values?: FilterDetails[];
}
/**
 * A paginated list of users sharing the filter. This includes users that are
 * members of the groups or can browse the projects that the filter is shared with.
 */
export interface UserList {
  /** The index of the last item returned on the page. */
  "end-index"?: number;
  /** The list of items. */
  items?: User[];
  /** The maximum number of results that could be on the page. */
  "max-results"?: number;
  /** The number of items on the page. */
  size?: number;
  /** The index of the first item returned on the page. */
  "start-index"?: number;
}

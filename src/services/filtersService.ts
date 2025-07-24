import type {
  Filter,
  ChangeFilterOwner,
  PageBeanFilterDetails,
  ColumnItem,
  ColumnRequestBody,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ).
 * Use it to get, create, update, or delete filters. Also use it to configure the
 * columns for a filter and set favorite filters.
 */
export default function filters<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Changes the owner of the filter.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. However,
     * the user must own the filter or have the *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    changeFilterOwner: async ({
      id,
      changeFilterOwner,
      opts
    }: {
      /** The ID of the filter to update. */
      id: number;
      /**
       * The account ID of the new owner of the filter.
       *
       * @example
       * {
       *   "accountId": "0000-0000-0000-0000"
       * }
       */
      changeFilterOwner: ChangeFilterOwner;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/filter/{id}/owner",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(changeFilterOwner),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a filter. The filter is shared according to the [default share
     * scope](#api-rest-api-3-filter-post). The filter is not selected as a favorite.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    createFilter: async ({
      expand,
      overrideSharePermissions,
      filter,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `sharedUsers` Returns the users that the filter is shared with. This
       * includes users that can browse projects that the filter is shared with. If you
       * don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
       * doesn't list any users. The list of users returned is limited to 1000, to
       * access additional users append `[start-index:end-index]` to the expand request.
       * For example, to access the next 1000 users, use
       * `?expand=sharedUsers[1001:2000]`.
       *  *  `subscriptions` Returns the users that are subscribed to the filter. If you
       * don't specify `subscriptions`, the `subscriptions` object is returned but it
       * doesn't list any subscriptions. The list of subscriptions returned is limited
       * to 1000, to access additional subscriptions append `[start-index:end-index]` to
       * the expand request. For example, to access the next 1000 subscriptions, use
       * `?expand=subscriptions[1001:2000]`.
       */
      expand?: string;
      /**
       * EXPERIMENTAL: Whether share permissions are overridden to enable filters with
       * any share permissions to be created. Available to users with *Administer Jira*
       * [global permission](https://confluence.atlassian.com/x/x4dKLg).
       */
      overrideSharePermissions?: boolean;
      /**
       * The filter to create.
       *
       * @example
       * {
       *   "description": "Lists all open bugs",
       *   "jql": "type = Bug and resolution is empty",
       *   "name": "All Open Bugs"
       * }
       */
      filter: Filter;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Filter>> => {
      return jiraRequest<Filter>({
        path: "/rest/api/3/filter",
        method: "POST",
        queryParams: {
          expand,
          overrideSharePermissions
        },
        body: JSON.stringify(filter),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes a filter as a favorite for the user. Note that this operation only
     * removes filters visible to the user from the user's favorites list. For
     * example, if the user favorites a public filter that is subsequently made
     * private (and is therefore no longer visible on their favorites list) they
     * cannot remove it from their favorites list.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    deleteFavouriteForFilter: async ({
      id,
      expand,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `sharedUsers` Returns the users that the filter is shared with. This
       * includes users that can browse projects that the filter is shared with. If you
       * don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
       * doesn't list any users. The list of users returned is limited to 1000, to
       * access additional users append `[start-index:end-index]` to the expand request.
       * For example, to access the next 1000 users, use
       * `?expand=sharedUsers[1001:2000]`.
       *  *  `subscriptions` Returns the users that are subscribed to the filter. If you
       * don't specify `subscriptions`, the `subscriptions` object is returned but it
       * doesn't list any subscriptions. The list of subscriptions returned is limited
       * to 1000, to access additional subscriptions append `[start-index:end-index]` to
       * the expand request. For example, to access the next 1000 subscriptions, use
       * `?expand=subscriptions[1001:2000]`.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Filter>> => {
      return jiraRequest<Filter>({
        path: "/rest/api/3/filter/{id}/favourite",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Delete a filter.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however
     * filters can only be deleted by the creator of the filter or a user with
     * *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteFilter: async ({
      id,
      opts
    }: {
      /** The ID of the filter to delete. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/filter/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the columns configured for a filter. The column configuration is used
     * when the filter's results are viewed in *List View* with the *Columns* set to
     * *Filter*.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, column details are
     * only returned for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public.
     *
     * @returns Returned if the request is successful.
     */
    getColumns: async ({
      id,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ColumnItem[]>> => {
      return jiraRequest<ColumnItem[]>({
        path: "/rest/api/3/filter/{id}/columns",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the visible favorite filters of the user.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** A favorite filter is only visible to
     * the user where the filter is:
     *
     *  *  owned by the user.
     *  *  shared with a group that the user is a member of.
     *  *  shared with a private project that the user has *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  shared with a public project.
     *  *  shared with the public.
     *
     * For example, if the user favorites a public filter that is subsequently made
     * private that filter is not returned by this operation.
     *
     * @returns Returned if the request is successful.
     */
    getFavouriteFilters: async ({
      expand,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `sharedUsers` Returns the users that the filter is shared with. This
       * includes users that can browse projects that the filter is shared with. If you
       * don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
       * doesn't list any users. The list of users returned is limited to 1000, to
       * access additional users append `[start-index:end-index]` to the expand request.
       * For example, to access the next 1000 users, use
       * `?expand=sharedUsers[1001:2000]`.
       *  *  `subscriptions` Returns the users that are subscribed to the filter. If you
       * don't specify `subscriptions`, the `subscriptions` object is returned but it
       * doesn't list any subscriptions. The list of subscriptions returned is limited
       * to 1000, to access additional subscriptions append `[start-index:end-index]` to
       * the expand request. For example, to access the next 1000 subscriptions, use
       * `?expand=subscriptions[1001:2000]`.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<Filter[]>> => {
      return jiraRequest<Filter[]>({
        path: "/rest/api/3/filter/favourite",
        method: "GET",
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a filter.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, the filter is only
     * returned where it is:
     *
     *  *  owned by the user.
     *  *  shared with a group that the user is a member of.
     *  *  shared with a private project that the user has *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  shared with a public project.
     *  *  shared with the public.
     *
     * @returns Returned if the request is successful.
     */
    getFilter: async ({
      id,
      expand,
      overrideSharePermissions,
      opts
    }: {
      /** The ID of the filter to return. */
      id: number;
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `sharedUsers` Returns the users that the filter is shared with. This
       * includes users that can browse projects that the filter is shared with. If you
       * don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
       * doesn't list any users. The list of users returned is limited to 1000, to
       * access additional users append `[start-index:end-index]` to the expand request.
       * For example, to access the next 1000 users, use
       * `?expand=sharedUsers[1001:2000]`.
       *  *  `subscriptions` Returns the users that are subscribed to the filter. If you
       * don't specify `subscriptions`, the `subscriptions` object is returned but it
       * doesn't list any subscriptions. The list of subscriptions returned is limited
       * to 1000, to access additional subscriptions append `[start-index:end-index]` to
       * the expand request. For example, to access the next 1000 subscriptions, use
       * `?expand=subscriptions[1001:2000]`.
       */
      expand?: string;
      /**
       * EXPERIMENTAL: Whether share permissions are overridden to enable filters with
       * any share permissions to be returned. Available to users with *Administer Jira*
       * [global permission](https://confluence.atlassian.com/x/x4dKLg).
       */
      overrideSharePermissions?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Filter>> => {
      return jiraRequest<Filter>({
        path: "/rest/api/3/filter/{id}",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          expand,
          overrideSharePermissions
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of filters. Use this operation to get:
     *
     *  *  specific filters, by defining `id` only.
     *  *  filters that match all of the specified attributes. For example, all
     * filters for a user with a particular word in their name. When multiple
     * attributes are specified only filters matching all attributes are returned.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, only the following
     * filters that match the query parameters are returned:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public.
     *
     * @returns Returned if the request is successful.
     */
    getFiltersPaginated: async ({
      filterName,
      accountId,
      owner,
      groupname,
      groupId,
      projectId,
      id,
      orderBy,
      startAt,
      maxResults,
      expand,
      overrideSharePermissions,
      isSubstringMatch,
      opts
    }: {
      /** String used to perform a case-insensitive partial match with `name`. */
      filterName?: string;
      /**
       * User account ID used to return filters with the matching `owner.accountId`.
       * This parameter cannot be used with `owner`.
       */
      accountId?: string;
      /**
       * This parameter is deprecated because of privacy changes. Use `accountId`
       * instead. See the [migration
       * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details. User name used to return filters with the matching `owner.name`.
       * This parameter cannot be used with `accountId`.
       */
      owner?: string;
      /**
       * As a group's name can change, use of `groupId` is recommended to identify a
       * group. Group name used to returns filters that are shared with a group that
       * matches `sharePermissions.group.groupname`. This parameter cannot be used with
       * the `groupId` parameter.
       */
      groupname?: string;
      /**
       * Group ID used to returns filters that are shared with a group that matches
       * `sharePermissions.group.groupId`. This parameter cannot be used with the
       * `groupname` parameter.
       */
      groupId?: string;
      /**
       * Project ID used to returns filters that are shared with a project that matches
       * `sharePermissions.project.id`.
       */
      projectId?: number;
      /**
       * The list of filter IDs. To include multiple IDs, provide an ampersand-separated
       * list. For example, `id=10000&id=10001`. Do not exceed 200 filter IDs.
       */
      id?: number[];
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `description` Sorts by filter description. Note that this sorting works
       * independently of whether the expand to display the description field is in use.
       *  *  `favourite_count` Sorts by the count of how many users have this filter as
       * a favorite.
       *  *  `is_favourite` Sorts by whether the filter is marked as a favorite.
       *  *  `id` Sorts by filter ID.
       *  *  `name` Sorts by filter name.
       *  *  `owner` Sorts by the ID of the filter owner.
       *  *  `is_shared` Sorts by whether the filter is shared.
       */
      orderBy?:
        | "description"
        | "-description"
        | "+description"
        | "favourite_count"
        | "-favourite_count"
        | "+favourite_count"
        | "id"
        | "-id"
        | "+id"
        | "is_favourite"
        | "-is_favourite"
        | "+is_favourite"
        | "name"
        | "-name"
        | "+name"
        | "owner"
        | "-owner"
        | "+owner"
        | "is_shared"
        | "-is_shared"
        | "+is_shared";
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `description` Returns the description of the filter.
       *  *  `favourite` Returns an indicator of whether the user has set the filter as
       * a favorite.
       *  *  `favouritedCount` Returns a count of how many users have set this filter as
       * a favorite.
       *  *  `jql` Returns the JQL query that the filter uses.
       *  *  `owner` Returns the owner of the filter.
       *  *  `searchUrl` Returns a URL to perform the filter's JQL query.
       *  *  `sharePermissions` Returns the share permissions defined for the filter.
       *  *  `editPermissions` Returns the edit permissions defined for the filter.
       *  *  `isWritable` Returns whether the current user has permission to edit the
       * filter.
       *  *  `approximateLastUsed` \[Experimental\] Returns the approximate date and
       * time when the filter was last evaluated.
       *  *  `subscriptions` Returns the users that are subscribed to the filter.
       *  *  `viewUrl` Returns a URL to view the filter.
       */
      expand?: string;
      /**
       * EXPERIMENTAL: Whether share permissions are overridden to enable filters with
       * any share permissions to be returned. Available to users with *Administer Jira*
       * [global permission](https://confluence.atlassian.com/x/x4dKLg).
       */
      overrideSharePermissions?: boolean;
      /**
       * When `true` this will perform a case-insensitive substring match for the
       * provided `filterName`. When `false` the filter name will be searched using
       * [full text search
       * syntax](https://support.atlassian.com/jira-software-cloud/docs/search-for-issues-using-the-text-field/).
       */
      isSubstringMatch?: boolean;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanFilterDetails>> => {
      return jiraRequest<PageBeanFilterDetails>({
        path: "/rest/api/3/filter/search",
        method: "GET",
        queryParams: {
          filterName,
          accountId,
          owner,
          groupname,
          groupId,
          projectId,
          id,
          orderBy,
          startAt,
          maxResults,
          expand,
          overrideSharePermissions,
          isSubstringMatch
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the filters owned by the user. If `includeFavourites` is `true`, the
     * user's visible favorite filters are also returned.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however, a
     * favorite filters is only visible to the user where the filter is:
     *
     *  *  owned by the user.
     *  *  shared with a group that the user is a member of.
     *  *  shared with a private project that the user has *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  shared with a public project.
     *  *  shared with the public.
     *
     * For example, if the user favorites a public filter that is subsequently made
     * private that filter is not returned by this operation.
     *
     * @returns Returned if the request is successful.
     */
    getMyFilters: async ({
      expand,
      includeFavourites,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `sharedUsers` Returns the users that the filter is shared with. This
       * includes users that can browse projects that the filter is shared with. If you
       * don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
       * doesn't list any users. The list of users returned is limited to 1000, to
       * access additional users append `[start-index:end-index]` to the expand request.
       * For example, to access the next 1000 users, use
       * `?expand=sharedUsers[1001:2000]`.
       *  *  `subscriptions` Returns the users that are subscribed to the filter. If you
       * don't specify `subscriptions`, the `subscriptions` object is returned but it
       * doesn't list any subscriptions. The list of subscriptions returned is limited
       * to 1000, to access additional subscriptions append `[start-index:end-index]` to
       * the expand request. For example, to access the next 1000 subscriptions, use
       * `?expand=subscriptions[1001:2000]`.
       */
      expand?: string;
      /** Include the user's favorite filters in the response. */
      includeFavourites?: boolean;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<Filter[]>> => {
      return jiraRequest<Filter[]>({
        path: "/rest/api/3/filter/my",
        method: "GET",
        queryParams: {
          expand,
          includeFavourites
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Reset the user's column configuration for the filter to the default.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however,
     * columns are only reset for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public.
     */
    resetColumns: async ({
      id,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/filter/{id}/columns",
        method: "DELETE",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets the columns for a filter. Only navigable fields can be set as columns. Use
     * [Get fields](#api-rest-api-3-field-get) to get the list fields in Jira. A
     * navigable field has `navigable` set to `true`.
     *
     * The parameters for this resource are expressed as HTML form data. For example,
     * in curl:
     *
     * `curl -X PUT -d columns=summary -d columns=description
     * https://your-domain.atlassian.net/rest/api/3/filter/10000/columns`
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however,
     * columns are only set for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public.
     *
     * @returns Returned if the request is successful.
     */
    setColumns: async ({
      id,
      mediaType = "application/json",
      columnRequestBody,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
    } & (
      | {
          mediaType?: "application/json";
          /**
           * The IDs of the fields to set as columns. In the form data, specify each field
           * as `columns=id`, where `id` is the *id* of a field (as seen in the response for
           * [Get fields](#api-rest-api-<ver>-field-get)). For example, `columns=summary`.
           */
          columnRequestBody: ColumnRequestBody;
        }
      | {
          mediaType: "multipart/form-data";
          /**
           * The IDs of the fields to set as columns. In the form data, specify each field
           * as `columns=id`, where `id` is the *id* of a field (as seen in the response for
           * [Get fields](#api-rest-api-<ver>-field-get)). For example, `columns=summary`.
           */
          columnRequestBody: ColumnRequestBody;
        }
    ) &
      WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/filter/{id}/columns",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(columnRequestBody),
        config,
        opts: {
          ...opts,
          headers: {
            "Content-Type": mediaType
          }
        },
        isResponseAvailable: true
      });
    },

    /**
     * Add a filter as a favorite for the user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however,
     * the user can only favorite:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public.
     *
     * @returns Returned if the request is successful.
     */
    setFavouriteForFilter: async ({
      id,
      expand,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `sharedUsers` Returns the users that the filter is shared with. This
       * includes users that can browse projects that the filter is shared with. If you
       * don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
       * doesn't list any users. The list of users returned is limited to 1000, to
       * access additional users append `[start-index:end-index]` to the expand request.
       * For example, to access the next 1000 users, use
       * `?expand=sharedUsers[1001:2000]`.
       *  *  `subscriptions` Returns the users that are subscribed to the filter. If you
       * don't specify `subscriptions`, the `subscriptions` object is returned but it
       * doesn't list any subscriptions. The list of subscriptions returned is limited
       * to 1000, to access additional subscriptions append `[start-index:end-index]` to
       * the expand request. For example, to access the next 1000 subscriptions, use
       * `?expand=subscriptions[1001:2000]`.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Filter>> => {
      return jiraRequest<Filter>({
        path: "/rest/api/3/filter/{id}/favourite",
        method: "PUT",
        pathParams: {
          id
        },
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a filter. Use this operation to update a filter's name, description,
     * JQL, or sharing.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however
     * the user must own the filter.
     *
     * @returns Returned if the request is successful.
     */
    updateFilter: async ({
      id,
      expand,
      overrideSharePermissions,
      filter,
      opts
    }: {
      /** The ID of the filter to update. */
      id: number;
      /**
       * Use [expand](#expansion) to include additional information about filter in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `sharedUsers` Returns the users that the filter is shared with. This
       * includes users that can browse projects that the filter is shared with. If you
       * don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
       * doesn't list any users. The list of users returned is limited to 1000, to
       * access additional users append `[start-index:end-index]` to the expand request.
       * For example, to access the next 1000 users, use
       * `?expand=sharedUsers[1001:2000]`.
       *  *  `subscriptions` Returns the users that are subscribed to the filter. If you
       * don't specify `subscriptions`, the `subscriptions` object is returned but it
       * doesn't list any subscriptions. The list of subscriptions returned is limited
       * to 1000, to access additional subscriptions append `[start-index:end-index]` to
       * the expand request. For example, to access the next 1000 subscriptions, use
       * `?expand=subscriptions[1001:2000]`.
       */
      expand?: string;
      /**
       * EXPERIMENTAL: Whether share permissions are overridden to enable the addition
       * of any share permissions to filters. Available to users with *Administer Jira*
       * [global permission](https://confluence.atlassian.com/x/x4dKLg).
       */
      overrideSharePermissions?: boolean;
      /**
       * The filter to update.
       *
       * @example
       * {
       *   "description": "Lists all open bugs",
       *   "jql": "type = Bug and resolution is empty",
       *   "name": "All Open Bugs"
       * }
       */
      filter: Filter;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Filter>> => {
      return jiraRequest<Filter>({
        path: "/rest/api/3/filter/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        queryParams: {
          expand,
          overrideSharePermissions
        },
        body: JSON.stringify(filter),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}

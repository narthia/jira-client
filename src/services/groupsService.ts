import type {
  Group,
  AddGroupBean,
  PageBeanGroupDetails,
  PageBeanUserDetails,
  UpdateUserToGroupBean,
  FoundGroups,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents groups of users. Use it to get, create, find, and
 * delete groups as well as add and remove users from groups. (\[WARNING\] The
 * standard Atlassian group names are default names only and can be edited or
 * deleted. For example, an admin or Atlassian support could delete the default
 * group jira-software-users or rename it to jsw-users at any point. See
 * https://support.atlassian.com/user-management/docs/create-and-update-groups/
 * for details.)
 */
export default function groups<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds a user to a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member
     * of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)).
     *
     * @returns Returned if the request is successful.
     */
    addUserToGroup: async ({
      groupname,
      groupId,
      updateUserToGroupBean,
      opts
    }: {
      /**
       * As a group's name can change, use of `groupId` is recommended to identify a
       * group.
       * The name of the group. This parameter cannot be used with the `groupId`
       * parameter.
       */
      groupname?: string;
      /**
       * The ID of the group. This parameter cannot be used with the `groupName`
       * parameter.
       */
      groupId?: string;
      /**
       * The user to add to the group.
       *
       * @example
       * {
       *   "accountId": "5b10ac8d82e05b22cc7d4ef5"
       * }
       */
      updateUserToGroupBean: UpdateUserToGroupBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Group>> => {
      return jiraRequest<Group>({
        path: "/rest/api/3/group/user",
        method: "POST",
        queryParams: {
          groupname,
          groupId
        },
        body: JSON.stringify(updateUserToGroupBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of groups.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 10,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *       "name": "jdog-developers"
     *     },
     *     {
     *       "groupId": "6e87dc72-4f1f-421f-9382-2fee8b652487",
     *       "name": "juvenal-bot"
     *     }
     *   ]
     * }
     * ```
     */
    bulkGetGroups: async ({
      startAt,
      maxResults,
      groupId,
      groupName,
      accessType,
      applicationKey,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The ID of a group. To specify multiple IDs, pass multiple `groupId` parameters.
       * For example,
       * `groupId=5b10a2844c20165700ede21g&groupId=5b10ac8d82e05b22cc7d4ef5`.
       */
      groupId?: string[];
      /**
       * The name of a group. To specify multiple names, pass multiple `groupName`
       * parameters. For example,
       * `groupName=administrators&groupName=jira-software-users`.
       */
      groupName?: string[];
      /** The access level of a group. Valid values: 'site-admin', 'admin', 'user'. */
      accessType?: string;
      /**
       * The application key of the product user groups to search for. Valid values:
       * 'jira-servicedesk', 'jira-software', 'jira-product-discovery', 'jira-core'.
       */
      applicationKey?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanGroupDetails>> => {
      return jiraRequest<PageBeanGroupDetails>({
        path: "/rest/api/3/group/bulk",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          groupId,
          groupName,
          accessType,
          applicationKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member
     * of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "expand": "users",
     *   "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *   "name": "power-users",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625",
     *   "users": {
     *     "end-index": 0,
     *     "items": [
     *       {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "active": false,
     *         "displayName": "Mia Krystof",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       }
     *     ],
     *     "max-results": 50,
     *     "size": 1,
     *     "start-index": 0
     *   }
     * }
     * ```
     */
    createGroup: async ({
      addGroupBean,
      opts
    }: {
      /**
       * The name of the group.
       *
       * @example
       * {
       *   "name": "power-users"
       * }
       */
      addGroupBean: AddGroupBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Group>> => {
      return jiraRequest<Group>({
        path: "/rest/api/3/group",
        method: "POST",
        body: JSON.stringify(addGroupBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of groups whose names contain a query string. A list of group
     * names can be provided to exclude groups from the results.
     *
     * The primary use case for this resource is to populate a group picker
     * suggestions list. To this end, the returned object includes the `html` field
     * where the matched query term is highlighted in the group name with the HTML
     * strong tag. Also, the groups list is wrapped in a response object that contains
     * a header for use in the picker, specifically *Showing X of Y matching groups*.
     *
     * The list returns with the groups sorted. If no groups match the list criteria,
     * an empty list is returned.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and
     * calls by users without the required permission return an empty list.
     *
     * *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Without this
     * permission, calls where query is not an exact match to an existing group will
     * return an empty list.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "groups": [
     *     {
     *       "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *       "html": "<b>j</b>dog-developers",
     *       "name": "jdog-developers"
     *     },
     *     {
     *       "groupId": "6e87dc72-4f1f-421f-9382-2fee8b652487",
     *       "html": "<b>j</b>uvenal-bot",
     *       "name": "juvenal-bot"
     *     }
     *   ],
     *   "header": "Showing 20 of 25 matching groups",
     *   "total": 25
     * }
     * ```
     */
    findGroups: async ({
      accountId,
      query,
      exclude,
      excludeId,
      maxResults,
      caseInsensitive,
      userName,
      opts
    }: {
      /**
       * This parameter is deprecated, setting it does not affect the results. To find
       * groups containing a particular user, use [Get user
       * groups](#api-rest-api-3-user-groups-get).
       */
      accountId?: string;
      /** The string to find in group names. */
      query?: string;
      /**
       * As a group's name can change, use of `excludeGroupIds` is recommended to
       * identify a group.
       * A group to exclude from the result. To exclude multiple groups, provide an
       * ampersand-separated list. For example, `exclude=group1&exclude=group2`. This
       * parameter cannot be used with the `excludeGroupIds` parameter.
       */
      exclude?: string[];
      /**
       * A group ID to exclude from the result. To exclude multiple groups, provide an
       * ampersand-separated list. For example,
       * `excludeId=group1-id&excludeId=group2-id`. This parameter cannot be used with
       * the `excludeGroups` parameter.
       */
      excludeId?: string[];
      /**
       * The maximum number of groups to return. The maximum number of groups that can
       * be returned is limited by the system property `jira.ajax.autocomplete.limit`.
       */
      maxResults?: number;
      /** Whether the search for groups should be case insensitive. */
      caseInsensitive?: boolean;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      userName?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<FoundGroups>> => {
      return jiraRequest<FoundGroups>({
        path: "/rest/api/3/groups/picker",
        method: "GET",
        queryParams: {
          accountId,
          query,
          exclude,
          excludeId,
          maxResults,
          caseInsensitive,
          userName
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * This operation is deprecated, use
     * [`group/member`](#api-rest-api-3-group-member-get).
     *
     * Returns all users in a group.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    getGroup: async ({
      groupname,
      groupId,
      expand,
      opts
    }: {
      /**
       * As a group's name can change, use of `groupId` is recommended to identify a
       * group.
       * The name of the group. This parameter cannot be used with the `groupId`
       * parameter.
       */
      groupname?: string;
      /**
       * The ID of the group. This parameter cannot be used with the `groupName`
       * parameter.
       */
      groupId?: string;
      /** List of fields to expand. */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<Group>> => {
      return jiraRequest<Group>({
        path: "/rest/api/3/group",
        method: "GET",
        queryParams: {
          groupname,
          groupId,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all users in a group.
     *
     * Note that users are ordered by username, however the username is not returned
     * in the results due to privacy reasons.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "nextPage": "https://your-domain.atlassian.net/rest/api/3/group/member?groupId=276f955c-63d7-42c8-9520-92d01dca0625&includeInactiveUsers=false&startAt=4&maxResults=2",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/group/member?groupId=276f955c-63d7-42c8-9520-92d01dca0625&includeInactiveUsers=false&startAt=2&maxResults=2",
     *   "startAt": 3,
     *   "total": 5,
     *   "values": [
     *     {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": true,
     *       "avatarUrls": {},
     *       "displayName": "Mia",
     *       "emailAddress": "mia@example.com",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *       "timeZone": "Australia/Sydney"
     *     },
     *     {
     *       "accountId": "5b10a0effa615349cb016cd8",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {},
     *       "displayName": "Will",
     *       "emailAddress": "will@example.com",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a0effa615349cb016cd8",
     *       "timeZone": "Australia/Sydney"
     *     }
     *   ]
     * }
     * ```
     */
    getUsersFromGroup: async ({
      groupname,
      groupId,
      includeInactiveUsers,
      startAt,
      maxResults,
      opts
    }: {
      /**
       * As a group's name can change, use of `groupId` is recommended to identify a
       * group.
       * The name of the group. This parameter cannot be used with the `groupId`
       * parameter.
       */
      groupname?: string;
      /**
       * The ID of the group. This parameter cannot be used with the `groupName`
       * parameter.
       */
      groupId?: string;
      /** Include inactive users. */
      includeInactiveUsers?: boolean;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /**
       * The maximum number of items to return per page (number should be between 1 and
       * 50).
       */
      maxResults?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanUserDetails>> => {
      return jiraRequest<PageBeanUserDetails>({
        path: "/rest/api/3/group/member",
        method: "GET",
        queryParams: {
          groupname,
          groupId,
          includeInactiveUsers,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member
     * of the *site-admin* strategic
     * [group](https://confluence.atlassian.com/x/24xjL)).
     */
    removeGroup: async ({
      groupname,
      groupId,
      swapGroup,
      swapGroupId,
      opts
    }: {
      groupname?: string;
      /**
       * The ID of the group. This parameter cannot be used with the `groupname`
       * parameter.
       */
      groupId?: string;
      /**
       * As a group's name can change, use of `swapGroupId` is recommended to identify a
       * group.
       * The group to transfer restrictions to. Only comments and worklogs are
       * transferred. If restrictions are not transferred, comments and worklogs are
       * inaccessible after the deletion. This parameter cannot be used with the
       * `swapGroupId` parameter.
       */
      swapGroup?: string;
      /**
       * The ID of the group to transfer restrictions to. Only comments and worklogs are
       * transferred. If restrictions are not transferred, comments and worklogs are
       * inaccessible after the deletion. This parameter cannot be used with the
       * `swapGroup` parameter.
       */
      swapGroupId?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/group",
        method: "DELETE",
        queryParams: {
          groupname,
          groupId,
          swapGroup,
          swapGroupId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Removes a user from a group.
     *
     * **[Permissions](#permissions) required:** Site administration (that is, member
     * of the *site-admin* [group](https://confluence.atlassian.com/x/24xjL)).
     */
    removeUserFromGroup: async ({
      groupname,
      groupId,
      username,
      accountId,
      opts
    }: {
      /**
       * As a group's name can change, use of `groupId` is recommended to identify a
       * group.
       * The name of the group. This parameter cannot be used with the `groupId`
       * parameter.
       */
      groupname?: string;
      /**
       * The ID of the group. This parameter cannot be used with the `groupName`
       * parameter.
       */
      groupId?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/group/user",
        method: "DELETE",
        queryParams: {
          groupname,
          groupId,
          username,
          accountId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}

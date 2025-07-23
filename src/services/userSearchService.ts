import type {
  User,
  FoundUsers,
  PageBeanUser,
  PageBeanUserKey,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents various ways to search for and find users. Use it to
 * obtain list of users including users assignable to projects and issues, users
 * with permissions, user lists for pickup fields, and user lists generated using
 * structured queries. Note that the operations in this resource only return users
 * found within the first 1000 users.
 */
export default function userSearch<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a list of users that can be assigned to an issue. Use this operation to
     * find the list of users who can be assigned to:
     *
     *  *  a new issue, by providing the `projectKeyOrId`.
     *  *  an updated issue, by providing the `issueKey` or `issueId`.
     *  *  to an issue during a transition (workflow action), by providing the
     * `issueKey` or `issueId` and the transition id in `actionDescriptorId`. You can
     * obtain the IDs of an issue's valid transitions using the `transitions` option
     * in the `expand` parameter of [ Get
     * issue](#api-rest-api-3-issue-issueIdOrKey-get).
     *
     * In all these cases, you can pass an account ID to determine if a user can be
     * assigned to an issue. The user is returned in the response if they can be
     * assigned to the issue or issue transition.
     *
     * This operation takes the users in the range defined by `startAt` and
     * `maxResults`, up to the thousandth user, and then returns only the users from
     * that range that can be assigned the issue. This means the operation usually
     * returns fewer users than specified in `maxResults`. To get all the users who
     * can be assigned the issue, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * Privacy controls are applied to the response based on the users' preferences.
     * This could mean, for example, that the user's email address is hidden. See the
     * [Profile visibility
     * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/)
     * for more details.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Assign issues*
     * [project permission](https://confluence.atlassian.com/x/yodKLg)
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "accountId": "5b10a2844c20165700ede21g",
     *   "accountType": "atlassian",
     *   "active": true,
     *   "applicationRoles": {
     *     "items": [],
     *     "size": 1
     *   },
     *   "avatarUrls": {
     *     "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *     "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *     "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *     "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *   },
     *   "displayName": "Mia Krystof",
     *   "emailAddress": "mia@example.com",
     *   "groups": {
     *     "items": [],
     *     "size": 3
     *   },
     *   "key": "",
     *   "name": "",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *   "timeZone": "Australia/Sydney"
     * }
     * ```
     */
    findAssignableUsers: ({
      query,
      sessionId,
      username,
      accountId,
      project,
      issueKey,
      issueId,
      startAt,
      maxResults,
      actionDescriptorId,
      recommend,
      opts
    }: {
      /**
       * A query string that is matched against user attributes, such as `displayName`,
       * and `emailAddress`, to find relevant users. The string can match the prefix of
       * the attribute's value. For example, *query=john* matches a user with a
       * `displayName` of *John Smith* and a user with an `emailAddress` of
       * *johnson@example.com*. Required, unless `username` or `accountId` is specified.
       */
      query?: string;
      /** The sessionId of this request. SessionId is the same until the assignee is set. */
      sessionId?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * A query string that is matched exactly against user `accountId`. Required,
       * unless `query` is specified.
       */
      accountId?: string;
      /**
       * The project ID or project key (case sensitive). Required, unless `issueKey` or
       * `issueId` is specified.
       */
      project?: string;
      /** The key of the issue. Required, unless `issueId` or `project` is specified. */
      issueKey?: string;
      /** The ID of the issue. Required, unless `issueKey` or `project` is specified. */
      issueId?: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /**
       * The maximum number of items to return. This operation may return less than the
       * maximum number of items even if more are available. The operation fetches users
       * up to the maximum and then, from the fetched users, returns only the users that
       * can be assigned to the issue.
       */
      maxResults?: number;
      /** The ID of the transition. */
      actionDescriptorId?: number;
      recommend?: boolean;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<User[]>({
        config,
        path: "/rest/api/3/user/assignable/search",
        method: "GET",
        queryParams: {
          query,
          sessionId,
          username,
          accountId,
          project,
          issueKey,
          issueId,
          startAt,
          maxResults,
          actionDescriptorId,
          recommend
        },
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns a list of users who can be assigned issues in one or more projects. The
     * list may be restricted to users whose attributes match a string.
     *
     * This operation takes the users in the range defined by `startAt` and
     * `maxResults`, up to the thousandth user, and then returns only the users from
     * that range that can be assigned issues in the projects. This means the
     * operation usually returns fewer users than specified in `maxResults`. To get
     * all the users who can be assigned issues in the projects, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * Privacy controls are applied to the response based on the users' preferences.
     * This could mean, for example, that the user's email address is hidden. See the
     * [Profile visibility
     * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/)
     * for more details.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   {
     *     "accountId": "5b10ac8d82e05b22cc7d4ef5",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=48&s=48"
     *     },
     *     "displayName": "Emma Richards",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5"
     *   }
     * ]
     * ```
     *
     */
    findBulkAssignableUsers: ({
      query,
      username,
      accountId,
      projectKeys,
      startAt,
      maxResults,
      opts
    }: {
      /**
       * A query string that is matched against user attributes, such as `displayName`
       * and `emailAddress`, to find relevant users. The string can match the prefix of
       * the attribute's value. For example, *query=john* matches a user with a
       * `displayName` of *John Smith* and a user with an `emailAddress` of
       * *johnson@example.com*. Required, unless `accountId` is specified.
       */
      query?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * A query string that is matched exactly against user `accountId`. Required,
       * unless `query` is specified.
       */
      accountId?: string;
      /**
       * A list of project keys (case sensitive). This parameter accepts a
       * comma-separated list.
       */
      projectKeys: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<User[]>({
        config,
        path: "/rest/api/3/user/assignable/multiProjectSearch",
        method: "GET",
        queryParams: {
          query,
          username,
          accountId,
          projectKeys,
          startAt,
          maxResults
        },
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Finds users with a structured query and returns a [paginated](#pagination) list
     * of user keys.
     *
     * This operation takes the users in the range defined by `startAt` and
     * `maxResults`, up to the thousandth user, and then returns only the users from
     * that range that match the structured query. This means the operation usually
     * returns fewer users than specified in `maxResults`. To get all the users who
     * match the structured query, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * The query statements are:
     *
     *  *  `is assignee of PROJ` Returns the users that are assignees of at least one
     * issue in project *PROJ*.
     *  *  `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the
     * issues *PROJ-1* or *PROJ-2*.
     *  *  `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the
     * issues *PROJ-1* or *PROJ-2*.
     *  *  `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the
     * issues *PROJ-1* or *PROJ-2*.
     *  *  `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues
     * *PROJ-1* or *PROJ-2*.
     *  *  `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment
     * on the issues *PROJ-1* or *PROJ-2*.
     *  *  `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a
     * transition on issues *PROJ-1* or *PROJ-2*.
     *  *  `[propertyKey].entity.property.path is "property value"` Returns users with
     * the entity property value. For example, if user property `location` is set to
     * value `{"office": {"country": "AU", "city": "Sydney"}}`, then it's possible to
     * use `[location].office.city is "Sydney"` to match the user.
     *
     * The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ...
     * PROJ-n)*. Statements can be combined using the `AND` and `OR` operators to form
     * more complex queries. For example:
     *
     * `is assignee of PROJ AND [propertyKey].entity.property.path is "property value"`
     *
     * @returns Returned if the request is successful.
     */
    findUserKeysByQuery: ({
      query,
      startAt,
      maxResult,
      opts
    }: {
      /** The search query. */
      query: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResult?: number;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<PageBeanUserKey>({
        config,
        path: "/rest/api/3/user/search/query/key",
        method: "GET",
        queryParams: {
          query,
          startAt,
          maxResult
        },
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns a list of active users that match the search string and property.
     *
     * This operation first applies a filter to match the search string and property,
     * and then takes the filtered users in the range defined by `startAt` and
     * `maxResults`, up to the thousandth user. To get all the users who match the
     * search string and property, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * This operation can be accessed anonymously.
     *
     * Privacy controls are applied to the response based on the users' preferences.
     * This could mean, for example, that the user's email address is hidden. See the
     * [Profile visibility
     * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/)
     * for more details.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls or
     * calls by users without the required permission return empty search results.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   {
     *     "accountId": "5b10ac8d82e05b22cc7d4ef5",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=48&s=48"
     *     },
     *     "displayName": "Emma Richards",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5"
     *   }
     * ]
     * ```
     *
     */
    findUsers: ({
      query,
      username,
      accountId,
      startAt,
      maxResults,
      property,
      opts
    }: {
      /**
       * A query string that is matched against user attributes ( `displayName`, and
       * `emailAddress`) to find relevant users. The string can match the prefix of the
       * attribute's value. For example, *query=john* matches a user with a
       * `displayName` of *John Smith* and a user with an `emailAddress` of
       * *johnson@example.com*. Required, unless `accountId` or `property` is specified.
       */
      query?: string;
      username?: string;
      /**
       * A query string that is matched exactly against a user `accountId`. Required,
       * unless `query` or `property` is specified.
       */
      accountId?: string;
      /**
       * The index of the first item to return in a page of filtered results (page
       * offset).
       */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * A query string used to search properties. Property keys are specified by path,
       * so property keys containing dot (.) or equals (=) characters cannot be used.
       * The query string cannot be specified using a JSON object. Example: To search
       * for the value of `nested` from `{"something":{"nested":1,"other":2}}` use
       * `thepropertykey.something.nested=1`. Required, unless `accountId` or `query` is
       * specified.
       */
      property?: string;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<User[]>({
        config,
        path: "/rest/api/3/user/search",
        method: "GET",
        queryParams: {
          query,
          username,
          accountId,
          startAt,
          maxResults,
          property
        },
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Finds users with a structured query and returns a [paginated](#pagination) list
     * of user details.
     *
     * This operation takes the users in the range defined by `startAt` and
     * `maxResults`, up to the thousandth user, and then returns only the users from
     * that range that match the structured query. This means the operation usually
     * returns fewer users than specified in `maxResults`. To get all the users who
     * match the structured query, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * The query statements are:
     *
     *  *  `is assignee of PROJ` Returns the users that are assignees of at least one
     * issue in project *PROJ*.
     *  *  `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the
     * issues *PROJ-1* or *PROJ-2*.
     *  *  `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the
     * issues *PROJ-1* or *PROJ-2*.
     *  *  `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the
     * issues *PROJ-1* or *PROJ-2*.
     *  *  `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues
     * *PROJ-1* or *PROJ-2*.
     *  *  `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment
     * on the issues *PROJ-1* or *PROJ-2*.
     *  *  `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a
     * transition on issues *PROJ-1* or *PROJ-2*.
     *  *  `[propertyKey].entity.property.path is "property value"` Returns users with
     * the entity property value. For example, if user property `location` is set to
     * value `{"office": {"country": "AU", "city": "Sydney"}}`, then it's possible to
     * use `[location].office.city is "Sydney"` to match the user.
     *
     * The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ...
     * PROJ-n)*. Statements can be combined using the `AND` and `OR` operators to form
     * more complex queries. For example:
     *
     * `is assignee of PROJ AND [propertyKey].entity.property.path is "property value"`
     *
     * @returns Returned if the request is successful.
     */
    findUsersByQuery: ({
      query,
      startAt,
      maxResults,
      opts
    }: {
      /** The search query. */
      query: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<PageBeanUser>({
        config,
        path: "/rest/api/3/user/search/query",
        method: "GET",
        queryParams: {
          query,
          startAt,
          maxResults
        },
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns a list of users whose attributes match the query term. The returned
     * object includes the `html` field where the matched query term is highlighted
     * with the HTML strong tag. A list of account IDs can be provided to exclude
     * users from the results.
     *
     * This operation takes the users in the range defined by `maxResults`, up to the
     * thousandth user, and then returns only the users from that range that match the
     * query term. This means the operation usually returns fewer users than specified
     * in `maxResults`. To get all the users who match the query term, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * Privacy controls are applied to the response based on the users' preferences.
     * This could mean, for example, that the user's email address is hidden. See the
     * [Profile visibility
     * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/)
     * for more details.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls and
     * calls by users without the required permission return search results for an
     * exact name match only.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "header": "Showing 20 of 25 matching groups",
     *   "total": 25,
     *   "users": [
     *     {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "avatarUrl": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "displayName": "Mia Krystof",
     *       "html": "<strong>Mi</strong>a Krystof - <strong>mi</strong>a@example.com (<strong>mi</strong>a)",
     *       "key": "mia",
     *       "name": "mia"
     *     }
     *   ]
     * }
     * ```
     */
    findUsersForPicker: ({
      query,
      maxResults,
      showAvatar,
      exclude,
      excludeAccountIds,
      avatarSize,
      excludeConnectUsers,
      opts
    }: {
      /**
       * A query string that is matched against user attributes, such as `displayName`,
       * and `emailAddress`, to find relevant users. The string can match the prefix of
       * the attribute's value. For example, *query=john* matches a user with a
       * `displayName` of *John Smith* and a user with an `emailAddress` of
       * *johnson@example.com*.
       */
      query: string;
      /**
       * The maximum number of items to return. The total number of matched users is
       * returned in `total`.
       */
      maxResults?: number;
      /** Include the URI to the user's avatar. */
      showAvatar?: boolean;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      exclude?: string[];
      /**
       * A list of account IDs to exclude from the search results. This parameter
       * accepts a comma-separated list. Multiple account IDs can also be provided using
       * an ampersand-separated list. For example,
       * `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`.
       * Cannot be provided with `exclude`.
       */
      excludeAccountIds?: string[];
      avatarSize?: string;
      excludeConnectUsers?: boolean;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<FoundUsers>({
        config,
        path: "/rest/api/3/user/picker",
        method: "GET",
        queryParams: {
          query,
          maxResults,
          showAvatar,
          exclude,
          excludeAccountIds,
          avatarSize,
          excludeConnectUsers
        },
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns a list of users who fulfill these criteria:
     *
     *  *  their user attributes match a search string.
     *  *  they have a set of permissions for a project or issue.
     *
     * If no search string is provided, a list of all users with the permissions is
     * returned.
     *
     * This operation takes the users in the range defined by `startAt` and
     * `maxResults`, up to the thousandth user, and then returns only the users from
     * that range that match the search string and have permission for the project or
     * issue. This means the operation usually returns fewer users than specified in
     * `maxResults`. To get all the users who match the search string and have
     * permission for the project or issue, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * Privacy controls are applied to the response based on the users' preferences.
     * This could mean, for example, that the user's email address is hidden. See the
     * [Profile visibility
     * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/)
     * for more details.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg), to get users for any
     * project.
     *  *  *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for a project, to get
     * users for that project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   {
     *     "accountId": "5b10ac8d82e05b22cc7d4ef5",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=48&s=48"
     *     },
     *     "displayName": "Emma Richards",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5"
     *   }
     * ]
     * ```
     *
     */
    findUsersWithAllPermissions: ({
      query,
      username,
      accountId,
      permissions,
      issueKey,
      projectKey,
      startAt,
      maxResults,
      opts
    }: {
      /**
       * A query string that is matched against user attributes, such as `displayName`
       * and `emailAddress`, to find relevant users. The string can match the prefix of
       * the attribute's value. For example, *query=john* matches a user with a
       * `displayName` of *John Smith* and a user with an `emailAddress` of
       * *johnson@example.com*. Required, unless `accountId` is specified.
       */
      query?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * A query string that is matched exactly against user `accountId`. Required,
       * unless `query` is specified.
       */
      accountId?: string;
      /**
       * A comma separated list of permissions. Permissions can be specified as any:
       *
       *  *  permission returned by [Get all
       * permissions](#api-rest-api-3-permissions-get).
       *  *  custom project permission added by Connect apps.
       *  *  (deprecated) one of the following:
       *
       *      *  ASSIGNABLE\_USER
       *      *  ASSIGN\_ISSUE
       *      *  ATTACHMENT\_DELETE\_ALL
       *      *  ATTACHMENT\_DELETE\_OWN
       *      *  BROWSE
       *      *  CLOSE\_ISSUE
       *      *  COMMENT\_DELETE\_ALL
       *      *  COMMENT\_DELETE\_OWN
       *      *  COMMENT\_EDIT\_ALL
       *      *  COMMENT\_EDIT\_OWN
       *      *  COMMENT\_ISSUE
       *      *  CREATE\_ATTACHMENT
       *      *  CREATE\_ISSUE
       *      *  DELETE\_ISSUE
       *      *  EDIT\_ISSUE
       *      *  LINK\_ISSUE
       *      *  MANAGE\_WATCHER\_LIST
       *      *  MODIFY\_REPORTER
       *      *  MOVE\_ISSUE
       *      *  PROJECT\_ADMIN
       *      *  RESOLVE\_ISSUE
       *      *  SCHEDULE\_ISSUE
       *      *  SET\_ISSUE\_SECURITY
       *      *  TRANSITION\_ISSUE
       *      *  VIEW\_VERSION\_CONTROL
       *      *  VIEW\_VOTERS\_AND\_WATCHERS
       *      *  VIEW\_WORKFLOW\_READONLY
       *      *  WORKLOG\_DELETE\_ALL
       *      *  WORKLOG\_DELETE\_OWN
       *      *  WORKLOG\_EDIT\_ALL
       *      *  WORKLOG\_EDIT\_OWN
       *      *  WORK\_ISSUE
       */
      permissions: string;
      /** The issue key for the issue. */
      issueKey?: string;
      /** The project key for the project (case sensitive). */
      projectKey?: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<User[]>({
        config,
        path: "/rest/api/3/user/permission/search",
        method: "GET",
        queryParams: {
          query,
          username,
          accountId,
          permissions,
          issueKey,
          projectKey,
          startAt,
          maxResults
        },
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns a list of users who fulfill these criteria:
     *
     *  *  their user attributes match a search string.
     *  *  they have permission to browse issues.
     *
     * Use this resource to find users who can browse:
     *
     *  *  an issue, by providing the `issueKey`.
     *  *  any issue in a project, by providing the `projectKey`.
     *
     * This operation takes the users in the range defined by `startAt` and
     * `maxResults`, up to the thousandth user, and then returns only the users from
     * that range that match the search string and have permission to browse issues.
     * This means the operation usually returns fewer users than specified in
     * `maxResults`. To get all the users who match the search string and have
     * permission to browse issues, use [Get all
     * users](#api-rest-api-3-users-search-get) and filter the records in your code.
     *
     * Privacy controls are applied to the response based on the users' preferences.
     * This could mean, for example, that the user's email address is hidden. See the
     * [Profile visibility
     * overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/)
     * for more details.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls and
     * calls by users without the required permission return empty search results.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   {
     *     "accountId": "5b10ac8d82e05b22cc7d4ef5",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/AA-3.png?size=48&s=48"
     *     },
     *     "displayName": "Emma Richards",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5"
     *   }
     * ]
     * ```
     *
     */
    findUsersWithBrowsePermission: ({
      query,
      username,
      accountId,
      issueKey,
      projectKey,
      startAt,
      maxResults,
      opts
    }: {
      /**
       * A query string that is matched against user attributes, such as `displayName`
       * and `emailAddress`, to find relevant users. The string can match the prefix of
       * the attribute's value. For example, *query=john* matches a user with a
       * `displayName` of *John Smith* and a user with an `emailAddress` of
       * *johnson@example.com*. Required, unless `accountId` is specified.
       */
      query?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * A query string that is matched exactly against user `accountId`. Required,
       * unless `query` is specified.
       */
      accountId?: string;
      /** The issue key for the issue. Required, unless `projectKey` is specified. */
      issueKey?: string;
      /**
       * The project key for the project (case sensitive). Required, unless `issueKey`
       * is specified.
       */
      projectKey?: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>) => {
      return jiraRequest<User[]>({
        config,
        path: "/rest/api/3/user/viewissue/search",
        method: "GET",
        queryParams: {
          query,
          username,
          accountId,
          issueKey,
          projectKey,
          startAt,
          maxResults
        },
        opts,
        isResponseAvailable: true
      });
    }
  };
}

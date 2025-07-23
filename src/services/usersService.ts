import type {
  User,
  PageBeanUser,
  ColumnItem,
  GroupName,
  NewUserDetails,
  UserMigrationBean,
  UserColumnRequestBody,
  UnrestrictedUserEmail,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represent users. Use it to:
 *
 *  *  get, get a list of, create, and delete users.
 *  *  get, set, and reset a user's default issue table columns.
 *  *  get a list of the groups the user belongs to.
 *  *  get a list of user account IDs for a list of usernames or user keys.
 */
export default function users<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a [paginated](#pagination) list of the users specified by one or more
     * account IDs.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    bulkGetUsers: async ({
      startAt,
      maxResults,
      username,
      key,
      accountId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string[];
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      key?: string[];
      /**
       * The account ID of a user. To specify multiple users, pass multiple `accountId`
       * parameters. For example,
       * `accountId=5b10a2844c20165700ede21g&accountId=5b10ac8d82e05b22cc7d4ef5`.
       */
      accountId: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanUser>> => {
      return jiraRequest<PageBeanUser>({
        path: "/rest/api/3/user/bulk",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          username,
          key,
          accountId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of users and their account IDs. This resource is deprecated and
     * will be removed on 2024-07-31.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    bulkGetUsersMigration: async ({
      startAt,
      maxResults,
      username,
      key,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * Username of a user. To specify multiple users, pass multiple copies of this
       * parameter. For example, `username=fred&username=barney`. Required if `key`
       * isn't provided. Cannot be provided if `key` is present.
       */
      username?: string[];
      /**
       * Key of a user. To specify multiple users, pass multiple copies of this
       * parameter. For example, `key=fred&key=barney`. Required if `username` isn't
       * provided. Cannot be provided if `username` is present.
       */
      key?: string[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<UserMigrationBean[]>> => {
      return jiraRequest<UserMigrationBean[]>({
        path: "/rest/api/3/user/bulk/migration",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          username,
          key
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a user. This resource is retained for legacy compatibility. As soon as
     * a more modern alternative is available this resource will be deprecated.
     *
     * The option is provided to set or generate a password for the user. When using
     * this option, a password confirmation is required in the request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    createUser: async ({
      newUserDetails,
      opts
    }: {
      /**
       * Details about the user to be created.
       *
       * @example
       * {
       *   "emailAddress": "mia@atlassian.com",
       *   "products": [
       *     "jira-software"
       *   ]
       * }
       */
      newUserDetails: NewUserDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<User>> => {
      return jiraRequest<User>({
        path: "/rest/api/3/user",
        method: "POST",
        body: JSON.stringify(newUserDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of all users, including active users, inactive users and users
     * previously deleted within the last 30 days. Deprecated, use [Get all users
     * (paginated)](#api-rest-api-3-users-search-get) instead.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    getAllUsers: async ({
      startAt,
      maxResults,
      opts
    }: {
      /** The index of the first item to return. */
      startAt?: number;
      /** The maximum number of items to return (limited to 1000). */
      maxResults?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<User[]>> => {
      return jiraRequest<User[]>({
        path: "/rest/api/3/users",
        method: "GET",
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of all users, including active users, inactive users and users
     * previously deleted within the last 30 days. Deprecated, use [Get all users
     * (paginated)](#api-rest-api-3-users-search-get) instead.
     *
     * **[Permissions](#permissions) required:** *Browse users and groups* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    getAllUsersDefault: async ({
      startAt,
      maxResults,
      opts
    }: {
      /** The index of the first item to return. */
      startAt?: number;
      /** The maximum number of items to return (limited to 1000). */
      maxResults?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<User[]>> => {
      return jiraRequest<User[]>({
        path: "/rest/api/3/users/search",
        method: "GET",
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getUser: async ({
      accountId,
      username,
      key,
      expand,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required.
       */
      accountId?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide)
       * for details.
       */
      username?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide)
       * for details.
       */
      key?: string;
      /**
       * Use [expand](#expansion) to include additional information about users in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `groups` includes all groups and nested groups to which the user belongs.
       *  *  `applicationRoles` includes details of all the applications to which the
       * user has access.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<User>> => {
      return jiraRequest<User>({
        path: "/rest/api/3/user",
        method: "GET",
        queryParams: {
          accountId,
          username,
          key,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the default [issue table columns](https://confluence.atlassian.com/x/XYdKLg)
     * for the user. If `accountId` is not passed in the request, the calling user's
     * details are returned.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg),
     * to get the column details for any user.
     *  *  Permission to access Jira, if no `accountId` is passed in the request.
     *
     * @returns Returned if the request is successful.
     */
    getUserDefaultColumns: async ({
      accountId,
      username,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * This parameter is no longer available See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<ColumnItem[]>> => {
      return jiraRequest<ColumnItem[]>({
        path: "/rest/api/3/user/columns",
        method: "GET",
        queryParams: {
          accountId,
          username
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the email address for a user. This API is only available to apps
     * approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getUserEmail: async ({
      accountId,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`.
       */
      accountId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<UnrestrictedUserEmail>> => {
      return jiraRequest<UnrestrictedUserEmail>({
        path: "/rest/api/3/user/email",
        method: "GET",
        queryParams: {
          accountId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the email addresses for users. This API is only available to apps
     * approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getUserEmailBulk: async ({
      accountId,
      opts
    }: {
      /**
       * The account IDs of the users for which emails are required. An `accountId` is
       * an identifier that uniquely identifies the user across all Atlassian products.
       * For example, `5b10ac8d82e05b22cc7d4ef5`. Note, this should be treated as an
       * opaque identifier (that is, do not assume any structure in the value).
       */
      accountId: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<UnrestrictedUserEmail>> => {
      return jiraRequest<UnrestrictedUserEmail>({
        path: "/rest/api/3/user/email/bulk",
        method: "GET",
        queryParams: {
          accountId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the groups to which a user belongs.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getUserGroups: async ({
      accountId,
      username,
      key,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      key?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<GroupName[]>> => {
      return jiraRequest<GroupName[]>({
        path: "/rest/api/3/user/groups",
        method: "GET",
        queryParams: {
          accountId,
          username,
          key
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a user.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeUser: async ({
      accountId,
      username,
      key,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      key?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/user",
        method: "DELETE",
        queryParams: {
          accountId,
          username,
          key
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Resets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg)
     * for the user to the system default. If `accountId` is not passed, the calling
     * user's default columns are reset.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg),
     * to reset the columns for any user.
     *  *  Permission to access Jira, if no `accountId` is passed in the request.
     *
     * @returns Returned if the request is successful.
     */
    resetUserColumns: async ({
      accountId,
      username,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/user/columns",
        method: "DELETE",
        queryParams: {
          accountId,
          username
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets the default [ issue table columns](https://confluence.atlassian.com/x/XYdKLg)
     * for the user. If an account ID is not passed, the calling user's default
     * columns are set. If no column details are sent, then all default columns are
     * removed.
     *
     * The parameters for this resource are expressed as HTML form data. For example,
     * in curl:
     *
     * `curl -X PUT -d columns=summary -d columns=description
     * https://your-domain.atlassian.net/rest/api/3/user/columns?accountId=5b10ac8d82e05b22cc7d4ef5`
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg),
     * to set the columns for any user.
     *  *  Permission to access Jira, if no `accountId` is passed in the request.
     *
     * @returns Returned if the request is successful.
     */
    setUserColumns: async ({
      accountId,
      userColumnRequestBody,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * The ID of a column to set. To set multiple columns, send multiple `columns`
       * parameters.
       */
      userColumnRequestBody: UserColumnRequestBody;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/user/columns",
        method: "PUT",
        queryParams: {
          accountId
        },
        body: JSON.stringify(userColumnRequestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}

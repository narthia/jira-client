import type {
  Watchers,
  IssueList,
  BulkIssueIsWatching,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents users watching an issue. Use it to get details of
 * users watching an issue as well as start and stop a user watching an issue.
 */
export default function issueWatchers<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds a user as a watcher of an issue by passing the account ID of the user. For
     * example, `"5b10ac8d82e05b22cc7d4ef5"`. If no user is specified the calling user
     * is added.
     * 
     * This operation requires the **Allow users to watch issues** option to be *ON*.
     * This option is set in General configuration for Jira. See [Configuring Jira
     * application options](https://confluence.atlassian.com/x/uYXKM) for details.
     * 
     * **[Permissions](#permissions) required:**
     * 
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  To add users other than themselves to the watchlist, *Manage watcher list*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * that the issue is in.
     * 
     * @returns Returned if the request is successful.
     */
    addWatcher: async ({
      issueIdOrKey,
      requestBody,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /**
       * The account ID of the user. Note that username cannot be used due to privacy
       * changes.
       */
      requestBody: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/watchers",
        method: "POST",
        pathParams: {
          issueIdOrKey
        },
        body: requestBody,
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the watchers for an issue.
     * 
     * This operation requires the **Allow users to watch issues** option to be *ON*.
     * This option is set in General configuration for Jira. See [Configuring Jira
     * application options](https://confluence.atlassian.com/x/uYXKM) for details.
     * 
     * This operation can be accessed anonymously.
     * 
     * **[Permissions](#permissions) required:**
     * 
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is ini
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  To see details of users on the watchlist other than themselves, *View
     * voters and watchers* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     * 
     * @returns Returned if the request is successful
     * 
     * example:
     * ```
     * {
     *   "isWatching": false,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-1/watchers",
     *   "watchCount": 1,
     *   "watchers": [
     *     {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "active": false,
     *       "displayName": "Mia Krystof",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     }
     *   ]
     * }
     * ```
     */
    getIssueWatchers: async ({
      issueIdOrKey,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Watchers>> => {
      return jiraRequest<Watchers>({
        path: "/rest/api/3/issue/{issueIdOrKey}/watchers",
        method: "GET",
        pathParams: {
          issueIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns, for the user, details of the watched status of issues from a list. If
     * an issue ID is invalid, the returned watched status is `false`.
     * 
     * This operation requires the **Allow users to watch issues** option to be *ON*.
     * This option is set in General configuration for Jira. See [Configuring Jira
     * application options](https://confluence.atlassian.com/x/uYXKM) for details.
     * 
     * **[Permissions](#permissions) required:**
     * 
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     * 
     * @returns Returned if the request is successful
     * 
     * example:
     * ```
     * {
     *   "issuesIsWatching": {
     *     "10001": true,
     *     "10002": false,
     *     "10005": true
     *   }
     * }
     * ```
     */
    getIsWatchingIssueBulk: async ({
      issueList,
      opts
    }: {
      /**
       * A list of issue IDs.
       * 
       * @example
       * {
       *   "issueIds": [
       *     "10001",
       *     "10002",
       *     "10005"
       *   ]
       * }
       */
      issueList: IssueList;
    } & WithRequestOpts<TClient>): Promise<JiraResult<BulkIssueIsWatching>> => {
      return jiraRequest<BulkIssueIsWatching>({
        path: "/rest/api/3/issue/watching",
        method: "POST",
        body: JSON.stringify(issueList),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a user as a watcher of an issue.
     * 
     * This operation requires the **Allow users to watch issues** option to be *ON*.
     * This option is set in General configuration for Jira. See [Configuring Jira
     * application options](https://confluence.atlassian.com/x/uYXKM) for details.
     * 
     * **[Permissions](#permissions) required:**
     * 
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  To remove users other than themselves from the watchlist, *Manage watcher
     * list* [project permission](https://confluence.atlassian.com/x/yodKLg) for the
     * project that the issue is in.
     */
    removeWatcher: async ({
      issueIdOrKey,
      username,
      accountId,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /**
       * This parameter is no longer available. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required.
       */
      accountId?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/watchers",
        method: "DELETE",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
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
import type {
  PageOfWorklogs,
  Worklog,
  WorklogIdsRequestBean,
  WorklogsMoveRequestBean,
  ChangedWorklogs,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue worklogs. Use it to:
 *
 *  *  get, create, update, and delete worklogs.
 *  *  obtain lists of updated or deleted worklogs.
 */
export default function issueWorklogs<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds a worklog to an issue.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an
     * error. For more information, see [Configuring time
     * tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Work on issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     */
    addWorklog: async ({
      issueIdOrKey,
      notifyUsers,
      adjustEstimate,
      newEstimate,
      reduceBy,
      expand,
      overrideEditableFlag,
      worklog,
      opts
    }: {
      /** The ID or key the issue. */
      issueIdOrKey: string;
      /** Whether users watching the issue are notified by email. */
      notifyUsers?: boolean;
      /**
       * Defines how to update the issue's time estimate, the options are:
       *
       *  *  `new` Sets the estimate to a specific value, defined in `newEstimate`.
       *  *  `leave` Leaves the estimate unchanged.
       *  *  `manual` Reduces the estimate by amount specified in `reduceBy`.
       *  *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog.
       */
      adjustEstimate?: "new" | "leave" | "manual" | "auto";
      /**
       * The value to set as the issue's remaining time estimate, as days (\#d), hours
       * (\#h), or minutes (\#m or \#). For example, *2d*. Required when
       * `adjustEstimate` is `new`.
       */
      newEstimate?: string;
      /**
       * The amount to reduce the issue's remaining estimate by, as days (\#d), hours
       * (\#h), or minutes (\#m). For example, *2d*. Required when `adjustEstimate` is
       * `manual`.
       */
      reduceBy?: string;
      /**
       * Use [expand](#expansion) to include additional information about work logs in
       * the response. This parameter accepts `properties`, which returns worklog
       * properties.
       */
      expand?: string;
      /**
       * Whether the worklog entry should be added to the issue even if the issue is not
       * editable, because jira.issue.editable set to false or missing. For example, the
       * issue is closed. Connect and Forge app users with *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
       */
      overrideEditableFlag?: boolean;
      /**
       * @example
       * {
       *   "comment": {
       *     "content": [
       *       {
       *         "content": [
       *           {
       *             "text": "I did some work here.",
       *             "type": "text"
       *           }
       *         ],
       *         "type": "paragraph"
       *       }
       *     ],
       *     "type": "doc",
       *     "version": 1
       *   },
       *   "started": "2021-01-17T12:34:00.000+0000",
       *   "timeSpentSeconds": 12000,
       *   "visibility": {
       *     "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
       *     "type": "group"
       *   }
       * }
       */
      worklog: Worklog;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Worklog>> => {
      return jiraRequest<Worklog>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog",
        method: "POST",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          notifyUsers,
          adjustEstimate,
          newEstimate,
          reduceBy,
          expand,
          overrideEditableFlag
        },
        body: JSON.stringify(worklog),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes worklogs and, for each deleted worklog, updates the remaining time
     * estimate of the associated issue.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Work on issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  *Delete all worklogs* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or *Delete own worklogs* to delete worklogs created by the user.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role that is permitted to view the worklog.
     *
     * @returns Returned if the request is successful.
     */
    bulkDeleteWorklogs: async ({
      issueIdOrKey,
      adjustEstimate,
      overrideEditableFlag,
      worklogIdsRequestBean,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /**
       * Defines how to update the issue's time estimate, the options are:
       *
       *  *  `leave` Leaves the estimate unchanged.
       *  *  `auto` Reduces the estimate by the aggregate value of `timeSpent` across
       * all worklogs being deleted.
       */
      adjustEstimate?: "leave" | "auto";
      /**
       * Whether the work log entries should be removed to the issue even if the issue
       * is not editable, because jira.issue.editable set to false or missing. For
       * example, the issue is closed. Connect and Forge app users with admin permission
       * can use this flag.
       */
      overrideEditableFlag?: boolean;
      /**
       * A JSON object containing a list of worklog IDs.
       *
       * @example
       * {
       *   "ids": [
       *     1,
       *     2,
       *     5,
       *     10
       *   ]
       * }
       */
      worklogIdsRequestBean: WorklogIdsRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog",
        method: "DELETE",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          adjustEstimate,
          overrideEditableFlag
        },
        body: JSON.stringify(worklogIdsRequestBean),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Moves worklogs to an issue.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Work on issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  *Move worklogs* [project permission](https://confluence.atlassian.com/x/yodKLg) to move worklogs or *Move own worklogs* to move worklogs created by the user.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role that is permitted to view the worklog.
     *
     * @returns Returned if the request is successful.
     */
    bulkMoveWorklogs: async ({
      issueIdOrKey,
      adjustEstimate,
      overrideEditableFlag,
      worklogsMoveRequestBean,
      opts
    }: {
      issueIdOrKey: string;
      /**
       * Defines how to update the issues' time estimate, the options are:
       *
       *  *  `leave` Leaves the estimate unchanged.
       *  *  `auto` Reduces the estimate by the aggregate value of `timeSpent` across
       * all worklogs being moved in the source issue, and increases it in the
       * destination issue.
       */
      adjustEstimate?: "leave" | "auto";
      /**
       * Whether the work log entry should be moved to and from the issues even if the
       * issues are not editable, because jira.issue.editable set to false or missing.
       * For example, the issue is closed. Connect and Forge app users with admin
       * permission can use this flag.
       */
      overrideEditableFlag?: boolean;
      /**
       * A JSON object containing a list of worklog IDs and the ID or key of the
       * destination issue.
       *
       * @example
       * {
       *   "ids": [
       *     1,
       *     2,
       *     5,
       *     10
       *   ],
       *   "issueIdOrKey": "ABC-1234"
       * }
       */
      worklogsMoveRequestBean: WorklogsMoveRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/move",
        method: "POST",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          adjustEstimate,
          overrideEditableFlag
        },
        body: JSON.stringify(worklogsMoveRequestBean),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes a worklog from an issue.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an
     * error. For more information, see [Configuring time
     * tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Work on issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  *Delete all worklogs* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete any worklog or *Delete own worklogs* to delete worklogs created by the user.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role that is permitted to view the worklog.
     *
     * @returns Returned if the request is successful.
     */
    deleteWorklog: async ({
      issueIdOrKey,
      id,
      notifyUsers,
      adjustEstimate,
      newEstimate,
      increaseBy,
      overrideEditableFlag,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the worklog. */
      id: string;
      /** Whether users watching the issue are notified by email. */
      notifyUsers?: boolean;
      /**
       * Defines how to update the issue's time estimate, the options are:
       *
       *  *  `new` Sets the estimate to a specific value, defined in `newEstimate`.
       *  *  `leave` Leaves the estimate unchanged.
       *  *  `manual` Increases the estimate by amount specified in `increaseBy`.
       *  *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog.
       */
      adjustEstimate?: "new" | "leave" | "manual" | "auto";
      /**
       * The value to set as the issue's remaining time estimate, as days (\#d), hours
       * (\#h), or minutes (\#m or \#). For example, *2d*. Required when
       * `adjustEstimate` is `new`.
       */
      newEstimate?: string;
      /**
       * The amount to increase the issue's remaining estimate by, as days (\#d), hours
       * (\#h), or minutes (\#m or \#). For example, *2d*. Required when
       * `adjustEstimate` is `manual`.
       */
      increaseBy?: string;
      /**
       * Whether the work log entry should be added to the issue even if the issue is
       * not editable, because jira.issue.editable set to false or missing. For example,
       * the issue is closed. Connect and Forge app users with admin permission can use
       * this flag.
       */
      overrideEditableFlag?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/{id}",
        method: "DELETE",
        pathParams: {
          issueIdOrKey,
          id
        },
        queryParams: {
          notifyUsers,
          adjustEstimate,
          newEstimate,
          increaseBy,
          overrideEditableFlag
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a list of IDs and update timestamps for worklogs that were deleted
     * since the given date and time.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getIdsOfWorklogsDeletedSince: async ({
      since,
      opts
    }: {
      /**
       * The date and time, as a UNIX timestamp in milliseconds, after which deleted
       * worklogs are returned.
       */
      since?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<ChangedWorklogs>> => {
      return jiraRequest<ChangedWorklogs>({
        path: "/rest/api/3/worklog/deleted",
        method: "GET",
        queryParams: {
          since
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of IDs and update timestamps for worklogs that were updated
     * since the given date and time.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getIdsOfWorklogsModifiedSince: async ({
      since,
      expand,
      opts
    }: {
      /**
       * The date and time, as a UNIX timestamp in milliseconds, after which updated
       * worklogs are returned.
       */
      since?: number;
      /**
       * Use [expand](#expansion) to include additional information about worklogs in
       * the response. This parameter accepts `properties` that returns the properties
       * of each worklog.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<ChangedWorklogs>> => {
      return jiraRequest<ChangedWorklogs>({
        path: "/rest/api/3/worklog/updated",
        method: "GET",
        queryParams: {
          since,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns worklogs for an issue, starting from the oldest worklog or from the
     * worklog started on or after a date and time.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an
     * error. For more information, see [Configuring time
     * tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the issue has worklogs, the user has permission to view the worklogs.
     *
     * @returns Returned if the request is successful.
     */
    getIssueWorklog: async ({
      issueIdOrKey,
      startAt,
      maxResults,
      startedAfter,
      startedBefore,
      expand,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The worklog start date and time, as a UNIX timestamp in milliseconds, after
       * which worklogs are returned.
       */
      startedAfter?: number;
      /**
       * The worklog start date and time, as a UNIX timestamp in milliseconds, before
       * which worklogs are returned.
       */
      startedBefore?: number;
      /**
       * Use [expand](#expansion) to include additional information about worklogs in
       * the response. This parameter accepts`properties`, which returns worklog
       * properties.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageOfWorklogs>> => {
      return jiraRequest<PageOfWorklogs>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog",
        method: "GET",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          startAt,
          maxResults,
          startedAfter,
          startedBefore,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a worklog.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an
     * error. For more information, see [Configuring time
     * tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role that is permitted to view the worklog.
     *
     * @returns Returned if the request is successful.
     */
    getWorklog: async ({
      issueIdOrKey,
      id,
      expand,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the worklog. */
      id: string;
      /**
       * Use [expand](#expansion) to include additional information about work logs in
       * the response. This parameter accepts
       *
       * `properties`, which returns worklog properties.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Worklog>> => {
      return jiraRequest<Worklog>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/{id}",
        method: "GET",
        pathParams: {
          issueIdOrKey,
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
     * Returns worklog details for a list of worklog IDs.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an
     * error. For more information, see [Configuring time
     * tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Worklog details are returned only where the user has:
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role that is permitted to view the worklog.
     *
     * @returns Returned if the request is successful.
     */
    getWorklogsForIds: async ({
      expand,
      worklogIdsRequestBean,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information about worklogs in
       * the response. This parameter accepts `properties` that returns the properties
       * of each worklog.
       */
      expand?: string;
      /**
       * A JSON object containing a list of worklog IDs.
       *
       * @example
       * {
       *   "ids": [
       *     1,
       *     2,
       *     5,
       *     10
       *   ]
       * }
       */
      worklogIdsRequestBean: WorklogIdsRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Worklog[]>> => {
      return jiraRequest<Worklog[]>({
        path: "/rest/api/3/worklog/list",
        method: "POST",
        queryParams: {
          expand
        },
        body: JSON.stringify(worklogIdsRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a worklog.
     *
     * Time tracking must be enabled in Jira, otherwise this operation returns an
     * error. For more information, see [Configuring time
     * tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Work on issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  *Edit all worklogs* [project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or *Edit own worklogs* to update worklogs created by the user.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the role that is permitted to view the worklog.
     *
     * @returns Returned if the request is successful.
     */
    updateWorklog: async ({
      issueIdOrKey,
      id,
      notifyUsers,
      adjustEstimate,
      newEstimate,
      expand,
      overrideEditableFlag,
      worklog,
      opts
    }: {
      /** The ID or key the issue. */
      issueIdOrKey: string;
      /** The ID of the worklog. */
      id: string;
      /** Whether users watching the issue are notified by email. */
      notifyUsers?: boolean;
      /**
       * Defines how to update the issue's time estimate, the options are:
       *
       *  *  `new` Sets the estimate to a specific value, defined in `newEstimate`.
       *  *  `leave` Leaves the estimate unchanged.
       *  *  `auto` Updates the estimate by the difference between the original and
       * updated value of `timeSpent` or `timeSpentSeconds`.
       */
      adjustEstimate?: "new" | "leave" | "manual" | "auto";
      /**
       * The value to set as the issue's remaining time estimate, as days (\#d), hours
       * (\#h), or minutes (\#m or \#). For example, *2d*. Required when
       * `adjustEstimate` is `new`.
       */
      newEstimate?: string;
      /**
       * Use [expand](#expansion) to include additional information about worklogs in
       * the response. This parameter accepts `properties`, which returns worklog
       * properties.
       */
      expand?: string;
      /**
       * Whether the worklog should be added to the issue even if the issue is not
       * editable. For example, because the issue is closed. Connect and Forge app users
       * with *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
       */
      overrideEditableFlag?: boolean;
      /**
       * @example
       * {
       *   "comment": {
       *     "content": [
       *       {
       *         "content": [
       *           {
       *             "text": "I did some work here.",
       *             "type": "text"
       *           }
       *         ],
       *         "type": "paragraph"
       *       }
       *     ],
       *     "type": "doc",
       *     "version": 1
       *   },
       *   "started": "2021-01-17T12:34:00.000+0000",
       *   "timeSpentSeconds": 12000,
       *   "visibility": {
       *     "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
       *     "type": "group"
       *   }
       * }
       */
      worklog: Worklog;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Worklog>> => {
      return jiraRequest<Worklog>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/{id}",
        method: "PUT",
        pathParams: {
          issueIdOrKey,
          id
        },
        queryParams: {
          notifyUsers,
          adjustEstimate,
          newEstimate,
          expand,
          overrideEditableFlag
        },
        body: JSON.stringify(worklog),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}

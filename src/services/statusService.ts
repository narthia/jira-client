import type {
  JiraStatus,
  StatusUpdateRequest,
  StatusCreateRequest,
  StatusProjectIssueTypeUsageDto,
  StatusProjectUsageDto,
  StatusWorkflowUsageDto,
  PageOfStatuses,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents statuses. Use it to search, get, create, delete, and
 * change statuses.
 */
export default function status<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates statuses for a global or project scope.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer projects* [project
     * permission.](https://confluence.atlassian.com/x/yodKLg)
     *  *  *Administer Jira* [project
     * permission.](https://confluence.atlassian.com/x/yodKLg)
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "description": "The issue is resolved",
     *     "id": "1000",
     *     "name": "Finished",
     *     "scope": {
     *       "project": {
     *         "id": "1"
     *       },
     *       "type": "PROJECT"
     *     },
     *     "statusCategory": "DONE",
     *     "usages": [],
     *     "workflowUsages": []
     *   }
     * ]
     * ```
     *
     */
    createStatuses: async ({
      statusCreateRequest,
      opts
    }: {
      /**
       * Details of the statuses being created and their scope.
       *
       * @example
       * {
       *   "scope": {
       *     "project": {
       *       "id": "1"
       *     },
       *     "type": "PROJECT"
       *   },
       *   "statuses": [
       *     {
       *       "description": "The issue is resolved",
       *       "name": "Finished",
       *       "statusCategory": "DONE"
       *     }
       *   ]
       * }
       */
      statusCreateRequest: StatusCreateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<JiraStatus[]>> => {
      return jiraRequest<JiraStatus[]>({
        path: "/rest/api/3/statuses",
        method: "POST",
        body: JSON.stringify(statusCreateRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes statuses by ID.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer projects* [project
     * permission.](https://confluence.atlassian.com/x/yodKLg)
     *  *  *Administer Jira* [project
     * permission.](https://confluence.atlassian.com/x/yodKLg)
     *
     * @returns Returned if the request is successful.
     */
    deleteStatusesById: async ({
      id,
      opts
    }: {
      /**
       * The list of status IDs. To include multiple IDs, provide an ampersand-separated
       * list. For example, id=10000&id=10001.
       *
       * Min items `1`, Max items `50`
       */
      id: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/statuses",
        method: "DELETE",
        queryParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of the issue types that use a status.
     * The list is for a specific project.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     */
    getProjectIssueTypeUsagesForStatus: async ({
      statusId,
      projectId,
      nextPageToken,
      maxResults,
      opts
    }: {
      /** The statusId to fetch issue type usages for */
      statusId: string;
      /** The projectId to fetch issue type usages for */
      projectId: string;
      /** The cursor for pagination */
      nextPageToken?: string;
      /** The maximum number of results to return. Must be an integer between 1 and 200. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<StatusProjectIssueTypeUsageDto>> => {
      return jiraRequest<StatusProjectIssueTypeUsageDto>({
        path: "/rest/api/3/status/{statusId}/project/{projectId}/issuetypes",
        method: "GET",
        pathParams: {
          statusId,
          projectId
        },
        queryParams: {
          nextPageToken,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of the projects that use a status.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    getProjectUsagesForStatus: async ({
      statusId,
      nextPageToken,
      maxResults,
      opts
    }: {
      /** The statusId to fetch project usages for */
      statusId: string;
      /** The cursor for pagination */
      nextPageToken?: string;
      /** The maximum number of results to return. Must be an integer between 1 and 200. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<StatusProjectUsageDto>> => {
      return jiraRequest<StatusProjectUsageDto>({
        path: "/rest/api/3/status/{statusId}/projects",
        method: "GET",
        pathParams: {
          statusId
        },
        queryParams: {
          nextPageToken,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a status.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getStatus: async ({
      idOrName,
      opts
    }: {
      /** The ID or name of the status. */
      idOrName: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<JiraStatus>> => {
      return jiraRequest<JiraStatus>({
        path: "/rest/api/3/status/{idOrName}",
        method: "GET",
        pathParams: {
          idOrName
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns statuses for the specified statuses IDs.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getStatusesById: async ({
      expand,
      id,
      opts
    }: {
      /**
       * Deprecated. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
       * for details.
       *
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `usages` Returns the project and issue types that use the status in their
       * workflow.
       *  *  `workflowUsages` Returns the workflows that use the status.
       */
      expand?: string;
      /**
       * The list of status IDs. To include multiple IDs, provide an ampersand-separated
       * list. For example, id=10000&id=10001.
       *
       * Min items `1`, Max items `50`
       */
      id: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<JiraStatus[]>> => {
      return jiraRequest<JiraStatus[]>({
        path: "/rest/api/3/statuses",
        method: "GET",
        queryParams: {
          expand,
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of the workflows that use a status.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    getWorkflowUsagesForStatus: async ({
      statusId,
      nextPageToken,
      maxResults,
      opts
    }: {
      /** The statusId to fetch workflow usages for */
      statusId: string;
      /** The cursor for pagination */
      nextPageToken?: string;
      /** The maximum number of results to return. Must be an integer between 1 and 200. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<StatusWorkflowUsageDto>> => {
      return jiraRequest<StatusWorkflowUsageDto>({
        path: "/rest/api/3/status/{statusId}/workflows",
        method: "GET",
        pathParams: {
          statusId
        },
        queryParams: {
          nextPageToken,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of statuses that match a search on name
     * or project.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    search: async ({
      expand,
      projectId,
      startAt,
      maxResults,
      searchString,
      statusCategory,
      opts
    }: {
      /**
       * Deprecated. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
       * for details.
       *
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `usages` Returns the project and issue types that use the status in their
       * workflow.
       *  *  `workflowUsages` Returns the workflows that use the status.
       */
      expand?: string;
      /** The project the status is part of or null for global statuses. */
      projectId?: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * Term to match status names against or null to search for all statuses in the
       * search scope.
       */
      searchString?: string;
      /**
       * Category of the status to filter by. The supported values are: `TODO`,
       * `IN_PROGRESS`, and `DONE`.
       */
      statusCategory?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageOfStatuses>> => {
      return jiraRequest<PageOfStatuses>({
        path: "/rest/api/3/statuses/search",
        method: "GET",
        queryParams: {
          expand,
          projectId,
          startAt,
          maxResults,
          searchString,
          statusCategory
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates statuses by ID.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer projects* [project
     * permission.](https://confluence.atlassian.com/x/yodKLg)
     *  *  *Administer Jira* [project
     * permission.](https://confluence.atlassian.com/x/yodKLg)
     *
     * @returns Returned if the request is successful.
     */
    updateStatuses: async ({
      statusUpdateRequest,
      opts
    }: {
      /**
       * The list of statuses that will be updated.
       *
       * @example
       * {
       *   "statuses": [
       *     {
       *       "description": "The issue is resolved",
       *       "id": "1000",
       *       "name": "Finished",
       *       "statusCategory": "DONE"
       *     }
       *   ]
       * }
       */
      statusUpdateRequest: StatusUpdateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/statuses",
        method: "PUT",
        body: JSON.stringify(statusUpdateRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}

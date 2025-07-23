import type {
  Priority,
  CreatePriorityDetails,
  PriorityId,
  UpdatePriorityDetails,
  SetDefaultPriorityRequest,
  ReorderIssuePriorities,
  PageBeanPriority,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue priorities. Use it to get, create and update
 * issue priorities and details for individual issue priorities.
 */
export default function issuePriorities<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates an issue priority.
     *
     * Deprecation applies to iconUrl param in request body which will be sunset on
     * 16th Mar 2025. For more details refer to
     * [changelog](https://developer.atlassian.com/changelog/#CHANGE-1525).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "10001"
     * }
     * ```
     */
    createPriority: async ({
      createPriorityDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "My priority description",
       *   "iconUrl": "images/icons/priorities/major.png",
       *   "name": "My new priority",
       *   "statusColor": "#ABCDEF"
       * }
       */
      createPriorityDetails: CreatePriorityDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PriorityId>> => {
      return jiraRequest<PriorityId>({
        path: "/rest/api/3/priority",
        method: "POST",
        body: JSON.stringify(createPriorityDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue priority.
     *
     * This operation is [asynchronous](#async). Follow the `location` link in the
     * response to determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deletePriority: async ({
      id,
      opts
    }: {
      /** The ID of the issue priority. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/priority/{id}",
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
     * Returns the list of all issue priorities.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @deprecated
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "description": "Major loss of function.",
     *     "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/major.png",
     *     "id": "1",
     *     "name": "Major",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/priority/3",
     *     "statusColor": "#009900"
     *   },
     *   {
     *     "description": "Very little impact.",
     *     "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/trivial.png",
     *     "id": "2",
     *     "name": "Trivial",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/priority/5",
     *     "statusColor": "#cfcfcf"
     *   }
     * ]
     * ```
     *
     */
    getPriorities: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<Priority[]>
    > => {
      return jiraRequest<Priority[]>({
        path: "/rest/api/3/priority",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns an issue priority.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "Major loss of function.",
     *   "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/major.png",
     *   "id": "1",
     *   "name": "Major",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/priority/3",
     *   "statusColor": "#009900"
     * }
     * ```
     */
    getPriority: async ({
      id,
      opts
    }: {
      /** The ID of the issue priority. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Priority>> => {
      return jiraRequest<Priority>({
        path: "/rest/api/3/priority/{id}",
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
     * Changes the order of issue priorities.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    movePriorities: async ({
      reorderIssuePriorities,
      opts
    }: {
      /**
       * @example
       * {
       *   "after": "10003",
       *   "ids": [
       *     "10004",
       *     "10005"
       *   ]
       * }
       */
      reorderIssuePriorities: ReorderIssuePriorities;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/priority/move",
        method: "PUT",
        body: JSON.stringify(reorderIssuePriorities),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of priorities. The list can contain all
     * priorities or a subset determined by any combination of these criteria:
     *
     *  *  a list of priority IDs. Any invalid priority IDs are ignored.
     *  *  a list of project IDs. Only priorities that are available in these projects
     * will be returned. Any invalid project IDs are ignored.
     *  *  whether the field configuration is a default. This returns priorities from
     * company-managed (classic) projects only, as there is no concept of default
     * priorities in team-managed projects.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @deprecated
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "description": "Major loss of function.",
     *       "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/major.png",
     *       "id": "1",
     *       "isDefault": true,
     *       "name": "Major",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/priority/3",
     *       "statusColor": "#009900"
     *     },
     *     {
     *       "description": "Very little impact.",
     *       "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/trivial.png",
     *       "id": "2",
     *       "isDefault": false,
     *       "name": "Trivial",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/priority/5",
     *       "statusColor": "#cfcfcf"
     *     }
     *   ]
     * }
     * ```
     */
    searchPriorities: async ({
      startAt,
      maxResults,
      id,
      projectId,
      priorityName,
      onlyDefault,
      expand,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /**
       * The list of priority IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `id=2&id=3`.
       */
      id?: string[];
      /**
       * The list of projects IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `projectId=10010&projectId=10111`.
       */
      projectId?: string[];
      /** The name of priority to search for. */
      priorityName?: string;
      /** Whether only the default priority is returned. */
      onlyDefault?: boolean;
      /**
       * Use `schemes` to return the associated priority schemes for each priority.
       * Limited to returning first 15 priority schemes per priority.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanPriority>> => {
      return jiraRequest<PageBeanPriority>({
        path: "/rest/api/3/priority/search",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          projectId,
          priorityName,
          onlyDefault,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets default issue priority.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    setDefaultPriority: async ({
      setDefaultPriorityRequest,
      opts
    }: {
      /**
       * @example
       * {
       *   "id": "3"
       * }
       */
      setDefaultPriorityRequest: SetDefaultPriorityRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/priority/default",
        method: "PUT",
        body: JSON.stringify(setDefaultPriorityRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates an issue priority.
     *
     * At least one request body parameter must be defined.
     *
     * Deprecation applies to iconUrl param in request body which will be sunset on
     * 16th Mar 2025. For more details refer to
     * [changelog](https://developer.atlassian.com/changelog/#CHANGE-1525).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    updatePriority: async ({
      id,
      updatePriorityDetails,
      opts
    }: {
      /** The ID of the issue priority. */
      id: string;
      /**
       * @example
       * {
       *   "description": "My updated priority description",
       *   "iconUrl": "images/icons/priorities/minor.png",
       *   "name": "My updated priority",
       *   "statusColor": "#123456"
       * }
       */
      updatePriorityDetails: UpdatePriorityDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/priority/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(updatePriorityDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}

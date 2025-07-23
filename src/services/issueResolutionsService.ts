import type {
  Resolution,
  CreateResolutionDetails,
  ResolutionId,
  UpdateResolutionDetails,
  SetDefaultResolutionRequest,
  ReorderIssueResolutionsRequest,
  PageBeanResolutionJsonBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue resolution values. Use it to obtain a list of
 * all issue resolution values and the details of individual resolution values.
 */
export default function issueResolutions<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates an issue resolution.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "10001"
     * }
     * ```
     */
    createResolution: async ({
      createResolutionDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "My resolution description",
       *   "name": "My new resolution"
       * }
       */
      createResolutionDetails: CreateResolutionDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ResolutionId>> => {
      return jiraRequest<ResolutionId>({
        path: "/rest/api/3/resolution",
        method: "POST",
        body: JSON.stringify(createResolutionDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue resolution.
     *
     * This operation is [asynchronous](#async). Follow the `location` link in the
     * response to determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteResolution: async ({
      id,
      replaceWith,
      opts
    }: {
      /** The ID of the issue resolution. */
      id: string;
      /**
       * The ID of the issue resolution that will replace the currently selected
       * resolution.
       */
      replaceWith: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/resolution/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          replaceWith
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns an issue resolution value.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "A fix for this issue is checked into the tree and tested.",
     *   "id": "10000",
     *   "name": "Fixed",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/resolution/1"
     * }
     * ```
     */
    getResolution: async ({
      id,
      opts
    }: {
      /** The ID of the issue resolution value. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Resolution>> => {
      return jiraRequest<Resolution>({
        path: "/rest/api/3/resolution/{id}",
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
     * Returns a list of all issue resolution values.
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
     *     "description": "A fix for this issue is checked into the tree and tested.",
     *     "id": "10000",
     *     "name": "Fixed",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/resolution/1"
     *   },
     *   {
     *     "description": "This is what it is supposed to do.",
     *     "id": "10001",
     *     "name": "Works as designed",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/resolution/3"
     *   }
     * ]
     * ```
     *
     */
    getResolutions: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<Resolution[]>
    > => {
      return jiraRequest<Resolution[]>({
        path: "/rest/api/3/resolution",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Changes the order of issue resolutions.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    moveResolutions: async ({
      reorderIssueResolutionsRequest,
      opts
    }: {
      /**
       * @example
       * {
       *   "after": "10002",
       *   "ids": [
       *     "10000",
       *     "10001"
       *   ]
       * }
       */
      reorderIssueResolutionsRequest: ReorderIssueResolutionsRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/resolution/move",
        method: "PUT",
        body: JSON.stringify(reorderIssueResolutionsRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of resolutions. The list can contain
     * all resolutions or a subset determined by any combination of these criteria:
     *
     *  *  a list of resolutions IDs.
     *  *  whether the field configuration is a default. This returns resolutions from
     * company-managed (classic) projects only, as there is no concept of default
     * resolutions in team-managed projects.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1,
     *   "values": [
     *     {
     *       "description": "This is what it is supposed to do.",
     *       "id": "10001",
     *       "isDefault": true,
     *       "name": "Works as designed"
     *     }
     *   ]
     * }
     * ```
     */
    searchResolutions: async ({
      startAt,
      maxResults,
      id,
      onlyDefault,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /** The list of resolutions IDs to be filtered out */
      id?: string[];
      /**
       * When set to true, return default only, when IDs provided, if none of them is
       * default, return empty page. Default value is false
       */
      onlyDefault?: boolean;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanResolutionJsonBean>> => {
      return jiraRequest<PageBeanResolutionJsonBean>({
        path: "/rest/api/3/resolution/search",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          onlyDefault
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets default issue resolution.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    setDefaultResolution: async ({
      setDefaultResolutionRequest,
      opts
    }: {
      /**
       * @example
       * {
       *   "id": "3"
       * }
       */
      setDefaultResolutionRequest: SetDefaultResolutionRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/resolution/default",
        method: "PUT",
        body: JSON.stringify(setDefaultResolutionRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates an issue resolution.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateResolution: async ({
      id,
      updateResolutionDetails,
      opts
    }: {
      /** The ID of the issue resolution. */
      id: string;
      /**
       * @example
       * {
       *   "description": "My updated resolution description",
       *   "name": "My updated resolution"
       * }
       */
      updateResolutionDetails: UpdateResolutionDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/resolution/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(updateResolutionDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}

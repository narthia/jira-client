import type {
  CreatePrioritySchemeDetails,
  PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects,
  PrioritySchemeId,
  UpdatePrioritySchemeRequestBean,
  UpdatePrioritySchemeResponseBean,
  PageBeanPriorityWithSequence,
  SuggestedMappingsRequestBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue priority schemes. Use it to get priority schemes
 * and related information, and to create, update and delete priority schemes.
 */
export default function prioritySchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a new priority scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the request is completed.
     *
     *    example:
     *    ```
     *    {
     *      "id": "10001"
     *    }
     *    ```
     *
     *  * status: 202, mediaType: application/json
     *
     *    Returned if the request is accepted.
     *
     *    example:
     *    ```
     *    {
     *      "id": "10001",
     *      "task": {
     *        "self": "https://your-domain.atlassian.net/rest/api/3/task/1",
     *        "id": "1",
     *        "description": "Task description",
     *        "status": "COMPLETE",
     *        "result": "the task result, this may be any JSON",
     *        "submittedBy": 10000,
     *        "progress": 100,
     *        "elapsedRuntime": 156,
     *        "submitted": 1501708132800,
     *        "started": 1501708132900,
     *        "finished": 1501708133000,
     *        "lastUpdate": 1501708133000
     *      }
     *    }
     *    ```
     */
    createPriorityScheme: async ({
      createPrioritySchemeDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "defaultPriorityId": 10001,
       *   "description": "My priority scheme description",
       *   "mappings": {
       *     "in": {
       *       "10002": 10000,
       *       "10005": 10001,
       *       "10006": 10001,
       *       "10008": 10003
       *     },
       *     "out": {}
       *   },
       *   "name": "My new priority scheme",
       *   "priorityIds": [
       *     10000,
       *     10001,
       *     10003
       *   ],
       *   "projectIds": [
       *     10005,
       *     10006,
       *     10007
       *   ]
       * }
       */
      createPrioritySchemeDetails: CreatePrioritySchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PrioritySchemeId>> => {
      return jiraRequest<PrioritySchemeId>({
        path: "/rest/api/3/priorityscheme",
        method: "POST",
        body: JSON.stringify(createPrioritySchemeDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a priority scheme.
     *
     * This operation is only available for priority schemes without any associated
     * projects. Any associated projects must be removed from the priority scheme
     * before this operation can be performed.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deletePriorityScheme: async ({
      schemeId,
      opts
    }: {
      /** The priority scheme ID. */
      schemeId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/priorityscheme/{schemeId}",
        method: "DELETE",
        pathParams: {
          schemeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of priorities available for adding to a
     * priority scheme.
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
     *   "total": 3,
     *   "values": [
     *     {
     *       "description": "Serious problem that could block progress.",
     *       "iconUrl": "/images/icons/priorities/high.svg",
     *       "id": "1",
     *       "isDefault": false,
     *       "name": "High",
     *       "statusColor": "#f15C75"
     *     },
     *     {
     *       "description": "Has the potential to affect progress.",
     *       "iconUrl": "/images/icons/priorities/medium.svg",
     *       "id": "2",
     *       "isDefault": true,
     *       "name": "Medium",
     *       "statusColor": "#f79232"
     *     },
     *     {
     *       "description": "Minor problem or easily worked around.",
     *       "iconUrl": "/images/icons/priorities/low.svg",
     *       "id": "3",
     *       "isDefault": false,
     *       "name": "Low",
     *       "statusColor": "#707070"
     *     }
     *   ]
     * }
     * ```
     */
    getAvailablePrioritiesByPriorityScheme: async ({
      startAt,
      maxResults,
      query,
      schemeId,
      exclude,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /** The string to query priorities on by name. */
      query?: string;
      /** The priority scheme ID. */
      schemeId: string;
      /** A list of priority IDs to exclude from the results. */
      exclude?: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanPriorityWithSequence>> => {
      return jiraRequest<PageBeanPriorityWithSequence>({
        path: "/rest/api/3/priorityscheme/priorities/available",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          query,
          schemeId,
          exclude
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of priorities by scheme.
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
     *   "total": 3,
     *   "values": [
     *     {
     *       "description": "Serious problem that could block progress.",
     *       "iconUrl": "/images/icons/priorities/high.svg",
     *       "id": "1",
     *       "isDefault": false,
     *       "name": "High",
     *       "statusColor": "#f15C75"
     *     },
     *     {
     *       "description": "Has the potential to affect progress.",
     *       "iconUrl": "/images/icons/priorities/medium.svg",
     *       "id": "2",
     *       "isDefault": true,
     *       "name": "Medium",
     *       "statusColor": "#f79232"
     *     },
     *     {
     *       "description": "Minor problem or easily worked around.",
     *       "iconUrl": "/images/icons/priorities/low.svg",
     *       "id": "3",
     *       "isDefault": false,
     *       "name": "Low",
     *       "statusColor": "#707070"
     *     }
     *   ]
     * }
     * ```
     */
    getPrioritiesByPriorityScheme: async ({
      schemeId,
      startAt,
      maxResults,
      opts
    }: {
      /** The priority scheme ID. */
      schemeId: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanPriorityWithSequence>> => {
      return jiraRequest<PageBeanPriorityWithSequence>({
        path: "/rest/api/3/priorityscheme/{schemeId}/priorities",
        method: "GET",
        pathParams: {
          schemeId
        },
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
     * Returns a [paginated](#pagination) list of priority schemes.
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
     *       "description": "This is the default scheme used by all new and unassigned projects",
     *       "id": "1",
     *       "isDefault": true,
     *       "name": "Default Priority Scheme",
     *       "priorities": {
     *         "isLast": true,
     *         "maxResults": 50,
     *         "startAt": 0,
     *         "total": 3,
     *         "values": [
     *           {
     *             "description": "Serious problem that could block progress.",
     *             "iconUrl": "/images/icons/priorities/high.svg",
     *             "id": "1",
     *             "isDefault": false,
     *             "name": "High",
     *             "statusColor": "#f15C75"
     *           },
     *           {
     *             "description": "Has the potential to affect progress.",
     *             "iconUrl": "/images/icons/priorities/medium.svg",
     *             "id": "2",
     *             "isDefault": true,
     *             "name": "Medium",
     *             "statusColor": "#f79232"
     *           },
     *           {
     *             "description": "Minor problem or easily worked around.",
     *             "iconUrl": "/images/icons/priorities/low.svg",
     *             "id": "3",
     *             "isDefault": false,
     *             "name": "Low",
     *             "statusColor": "#707070"
     *           }
     *         ]
     *       },
     *       "projects": {
     *         "isLast": true,
     *         "maxResults": 50,
     *         "startAt": 0,
     *         "total": 1,
     *         "values": [
     *           {
     *             "avatarUrls": {
     *               "16x16": "secure/projectavatar?size=xsmall&pid=10000",
     *               "24x24": "secure/projectavatar?size=small&pid=10000",
     *               "32x32": "secure/projectavatar?size=medium&pid=10000",
     *               "48x48": "secure/projectavatar?size=large&pid=10000"
     *             },
     *             "id": "10000",
     *             "key": "EX",
     *             "name": "Example",
     *             "projectCategory": {
     *               "description": "Project category description",
     *               "id": "10000",
     *               "name": "A project category"
     *             },
     *             "projectTypeKey": "ProjectTypeKey{key='software'}",
     *             "self": "project/EX",
     *             "simplified": false
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getPrioritySchemes: async ({
      startAt,
      maxResults,
      priorityId,
      schemeId,
      schemeName,
      onlyDefault,
      orderBy,
      expand,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /**
       * A set of priority IDs to filter by. To include multiple IDs, provide an
       * ampersand-separated list. For example, `priorityId=10000&priorityId=10001`.
       */
      priorityId?: number[];
      /**
       * A set of priority scheme IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `schemeId=10000&schemeId=10001`.
       */
      schemeId?: number[];
      /** The name of scheme to search for. */
      schemeName?: string;
      /** Whether only the default priority is returned. */
      onlyDefault?: boolean;
      /** The ordering to return the priority schemes by. */
      orderBy?: "name" | "+name" | "-name";
      /**
       * A comma separated list of additional information to return. "priorities" will
       * return priorities associated with the priority scheme. "projects" will return
       * projects associated with the priority scheme. `expand=priorities,projects`.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<
      JiraResult<PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects>
    > => {
      return jiraRequest<PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects>({
        path: "/rest/api/3/priorityscheme",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          priorityId,
          schemeId,
          schemeName,
          onlyDefault,
          orderBy,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of projects by scheme.
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
     *       "avatarUrls": {
     *         "16x16": "secure/projectavatar?size=xsmall&pid=10000",
     *         "24x24": "secure/projectavatar?size=small&pid=10000",
     *         "32x32": "secure/projectavatar?size=medium&pid=10000",
     *         "48x48": "secure/projectavatar?size=large&pid=10000"
     *       },
     *       "id": "10000",
     *       "key": "EX",
     *       "name": "Example",
     *       "projectCategory": {
     *         "description": "Project category description",
     *         "id": "10000",
     *         "name": "A project category"
     *       },
     *       "projectTypeKey": "ProjectTypeKey{key='software'}",
     *       "self": "project/EX",
     *       "simplified": false
     *     }
     *   ]
     * }
     * ```
     */
    getProjectsByPriorityScheme: async ({
      schemeId,
      startAt,
      maxResults,
      projectId,
      query,
      opts
    }: {
      /** The priority scheme ID. */
      schemeId: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /** The project IDs to filter by. For example, `projectId=10000&projectId=10001`. */
      projectId?: number[];
      /** The string to query projects on by name. */
      query?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/priorityscheme/{schemeId}/projects",
        method: "GET",
        pathParams: {
          schemeId
        },
        queryParams: {
          startAt,
          maxResults,
          projectId,
          query
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of priorities that would require
     * mapping, given a change in priorities or projects associated with a priority
     * scheme.
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
     *   "total": 3,
     *   "values": [
     *     {
     *       "description": "Serious problem that could block progress.",
     *       "iconUrl": "/images/icons/priorities/high.svg",
     *       "id": "1",
     *       "isDefault": false,
     *       "name": "High",
     *       "statusColor": "#f15C75"
     *     },
     *     {
     *       "description": "Has the potential to affect progress.",
     *       "iconUrl": "/images/icons/priorities/medium.svg",
     *       "id": "2",
     *       "isDefault": true,
     *       "name": "Medium",
     *       "statusColor": "#f79232"
     *     },
     *     {
     *       "description": "Minor problem or easily worked around.",
     *       "iconUrl": "/images/icons/priorities/low.svg",
     *       "id": "3",
     *       "isDefault": false,
     *       "name": "Low",
     *       "statusColor": "#707070"
     *     }
     *   ]
     * }
     * ```
     */
    suggestedPrioritiesForMappings: async ({
      suggestedMappingsRequestBean,
      opts
    }: {
      /**
       * @example
       * {
       *   "maxResults": 50,
       *   "priorities": {
       *     "add": [
       *       10001,
       *       10002
       *     ],
       *     "remove": [
       *       10003
       *     ]
       *   },
       *   "projects": {
       *     "add": [
       *       10021
       *     ]
       *   },
       *   "schemeId": 10005,
       *   "startAt": 0
       * }
       */
      suggestedMappingsRequestBean: SuggestedMappingsRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanPriorityWithSequence>> => {
      return jiraRequest<PageBeanPriorityWithSequence>({
        path: "/rest/api/3/priorityscheme/mappings",
        method: "POST",
        body: JSON.stringify(suggestedMappingsRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a priority scheme. This includes its details, the lists of priorities
     * and projects in it
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is accepted.
     *
     * example:
     * ```
     * {
     *   "task": {
     *     "self": "https://your-domain.atlassian.net/rest/api/3/task/1",
     *     "id": "1",
     *     "description": "Task description",
     *     "status": "COMPLETE",
     *     "result": "the task result, this may be any JSON",
     *     "submittedBy": 10000,
     *     "progress": 100,
     *     "elapsedRuntime": 156,
     *     "submitted": 1501708132800,
     *     "started": 1501708132900,
     *     "finished": 1501708133000,
     *     "lastUpdate": 1501708133000
     *   },
     *   "updated": {
     *     "description": "This is the default scheme used by all new and unassigned projects",
     *     "id": "1",
     *     "isDefault": true,
     *     "name": "Default Priority Scheme",
     *     "priorities": {
     *       "isLast": true,
     *       "maxResults": 50,
     *       "startAt": 0,
     *       "total": 3,
     *       "values": [
     *         {
     *           "description": "Serious problem that could block progress.",
     *           "iconUrl": "/images/icons/priorities/high.svg",
     *           "id": "1",
     *           "isDefault": false,
     *           "name": "High",
     *           "statusColor": "#f15C75"
     *         },
     *         {
     *           "description": "Has the potential to affect progress.",
     *           "iconUrl": "/images/icons/priorities/medium.svg",
     *           "id": "2",
     *           "isDefault": true,
     *           "name": "Medium",
     *           "statusColor": "#f79232"
     *         },
     *         {
     *           "description": "Minor problem or easily worked around.",
     *           "iconUrl": "/images/icons/priorities/low.svg",
     *           "id": "3",
     *           "isDefault": false,
     *           "name": "Low",
     *           "statusColor": "#707070"
     *         }
     *       ]
     *     },
     *     "projects": {
     *       "isLast": true,
     *       "maxResults": 50,
     *       "startAt": 0,
     *       "total": 1,
     *       "values": [
     *         {
     *           "avatarUrls": {
     *             "16x16": "secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "secure/projectavatar?size=small&pid=10000",
     *             "32x32": "secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "Project category description",
     *             "id": "10000",
     *             "name": "A project category"
     *           },
     *           "projectTypeKey": "ProjectTypeKey{key='software'}",
     *           "self": "project/EX",
     *           "simplified": false
     *         }
     *       ]
     *     }
     *   }
     * }
     * ```
     */
    updatePriorityScheme: async ({
      schemeId,
      updatePrioritySchemeRequestBean,
      opts
    }: {
      /** The ID of the priority scheme. */
      schemeId: number;
      /**
       * @example
       * {
       *   "defaultPriorityId": 10001,
       *   "description": "My priority scheme description",
       *   "mappings": {
       *     "in": {
       *       "10003": 10002,
       *       "10004": 10001
       *     },
       *     "out": {
       *       "10001": 10005,
       *       "10002": 10006
       *     }
       *   },
       *   "name": "My new priority scheme",
       *   "priorities": {
       *     "add": {
       *       "ids": [
       *         10001,
       *         10002
       *       ]
       *     },
       *     "remove": {
       *       "ids": [
       *         10003,
       *         10004
       *       ]
       *     }
       *   },
       *   "projects": {
       *     "add": {
       *       "ids": [
       *         10101,
       *         10102
       *       ]
       *     },
       *     "remove": {
       *       "ids": [
       *         10103,
       *         10104
       *       ]
       *     }
       *   }
       * }
       */
      updatePrioritySchemeRequestBean: UpdatePrioritySchemeRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<UpdatePrioritySchemeResponseBean>> => {
      return jiraRequest<UpdatePrioritySchemeResponseBean>({
        path: "/rest/api/3/priorityscheme/{schemeId}",
        method: "PUT",
        pathParams: {
          schemeId
        },
        body: JSON.stringify(updatePrioritySchemeRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}

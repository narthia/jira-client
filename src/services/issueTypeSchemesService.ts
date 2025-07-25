import type {
  IssueTypeIds,
  PageBeanIssueTypeScheme,
  IssueTypeSchemeDetails,
  IssueTypeSchemeId,
  IssueTypeSchemeUpdateDetails,
  OrderOfIssueTypes,
  PageBeanIssueTypeSchemeMapping,
  PageBeanIssueTypeSchemeProjects,
  IssueTypeSchemeProjectAssociation,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue type schemes in classic projects. Use it to:
 *
 *  *  get issue type schemes and a list of the projects that use them.
 *  *  associate issue type schemes with projects.
 *  *  add issue types to issue type schemes.
 *  *  delete issue types from issue type schemes.
 *  *  create, update, and delete issue type schemes.
 *  *  change the order of issue types in issue type schemes.
 */
export default function issueTypeSchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds issue types to an issue type scheme.
     *
     * The added issue types are appended to the issue types list.
     *
     * If any of the issue types exist in the issue type scheme, the operation fails
     * and no issue types are added.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    addIssueTypesToIssueTypeScheme: async ({
      issueTypeSchemeId,
      issueTypeIds,
      opts
    }: {
      /** The ID of the issue type scheme. */
      issueTypeSchemeId: number;
      /**
       * @example
       * {
       *   "issueTypeIds": [
       *     "10000",
       *     "10002",
       *     "10003"
       *   ]
       * }
       */
      issueTypeIds: IssueTypeIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype",
        method: "PUT",
        pathParams: {
          issueTypeSchemeId
        },
        body: JSON.stringify(issueTypeIds),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Assigns an issue type scheme to a project.
     *
     * If any issues in the project are assigned issue types not present in the new
     * scheme, the operation will fail. To complete the assignment those issues must
     * be updated to use issue types in the new scheme.
     *
     * Issue type schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    assignIssueTypeSchemeToProject: async ({
      issueTypeSchemeProjectAssociation,
      opts
    }: {
      /**
       * @example
       * {
       *   "issueTypeSchemeId": "10000",
       *   "projectId": "10000"
       * }
       */
      issueTypeSchemeProjectAssociation: IssueTypeSchemeProjectAssociation;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescheme/project",
        method: "PUT",
        body: JSON.stringify(issueTypeSchemeProjectAssociation),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "issueTypeSchemeId": "10010"
     * }
     * ```
     */
    createIssueTypeScheme: async ({
      issueTypeSchemeDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "defaultIssueTypeId": "10002",
       *   "description": "A collection of issue types suited to use in a kanban style project.",
       *   "issueTypeIds": [
       *     "10001",
       *     "10002",
       *     "10003"
       *   ],
       *   "name": "Kanban Issue Type Scheme"
       * }
       */
      issueTypeSchemeDetails: IssueTypeSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeSchemeId>> => {
      return jiraRequest<IssueTypeSchemeId>({
        path: "/rest/api/3/issuetypescheme",
        method: "POST",
        body: JSON.stringify(issueTypeSchemeDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue type scheme.
     *
     * Only issue type schemes used in classic projects can be deleted.
     *
     * Any projects assigned to the scheme are reassigned to the default issue type
     * scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the issue type scheme is deleted.
     */
    deleteIssueTypeScheme: async ({
      issueTypeSchemeId,
      opts
    }: {
      /** The ID of the issue type scheme. */
      issueTypeSchemeId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescheme/{issueTypeSchemeId}",
        method: "DELETE",
        pathParams: {
          issueTypeSchemeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue type schemes.
     *
     * Only issue type schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "id": "10000",
     *       "name": "Default Issue Type Scheme",
     *       "description": "Default issue type scheme is the list of global issue types. All newly created issue types will automatically be added to this scheme.",
     *       "defaultIssueTypeId": "10003",
     *       "isDefault": true
     *     },
     *     {
     *       "id": "10001",
     *       "name": "SUP: Kanban Issue Type Scheme",
     *       "description": "A collection of issue types suited to use in a kanban style project.",
     *       "projects": {
     *         "isLast": true,
     *         "maxResults": 100,
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
     *     },
     *     {
     *       "id": "10002",
     *       "name": "HR: Scrum issue type scheme",
     *       "description": "",
     *       "defaultIssueTypeId": "10004",
     *       "issueTypes": {
     *         "isLast": true,
     *         "maxResults": 100,
     *         "startAt": 0,
     *         "total": 1,
     *         "values": [
     *           {
     *             "description": "Improvement Issue Type",
     *             "hierarchyLevel": -1,
     *             "iconUrl": "www.example.com",
     *             "id": "1000L",
     *             "name": "Improvements",
     *             "subtask": true
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getAllIssueTypeSchemes: async ({
      startAt,
      maxResults,
      id,
      orderBy,
      expand,
      queryString,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of issue type schemes IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `id=10000&id=10001`.
       */
      id?: number[];
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `name` Sorts by issue type scheme name.
       *  *  `id` Sorts by issue type scheme ID.
       */
      orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `projects` For each issue type schemes, returns information about the
       * projects the issue type scheme is assigned to.
       *  *  `issueTypes` For each issue type schemes, returns information about the
       * issueTypes the issue type scheme have.
       */
      expand?: string;
      /**
       * String used to perform a case-insensitive partial match with issue type scheme
       * name.
       */
      queryString?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanIssueTypeScheme>> => {
      return jiraRequest<PageBeanIssueTypeScheme>({
        path: "/rest/api/3/issuetypescheme",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          orderBy,
          expand,
          queryString
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue type schemes and, for each
     * issue type scheme, a list of the projects that use it.
     *
     * Only issue type schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "issueTypeScheme": {
     *         "id": "10000",
     *         "name": "Default Issue Type Scheme",
     *         "description": "Default issue type scheme is the list of global issue types. All newly created issue types will automatically be added to this scheme.",
     *         "defaultIssueTypeId": "10003",
     *         "isDefault": true
     *       },
     *       "projectIds": [
     *         "10000",
     *         "10001"
     *       ]
     *     },
     *     {
     *       "issueTypeScheme": {
     *         "id": "10001",
     *         "name": "SUP: Kanban Issue Type Scheme",
     *         "description": "A collection of issue types suited to use in a kanban style project."
     *       },
     *       "projectIds": [
     *         "10002"
     *       ]
     *     },
     *     {
     *       "issueTypeScheme": {
     *         "id": "10002",
     *         "name": "HR: Scrum issue type scheme",
     *         "description": "",
     *         "defaultIssueTypeId": "10004",
     *         "issueTypes": {
     *           "isLast": true,
     *           "maxResults": 100,
     *           "startAt": 0,
     *           "total": 1,
     *           "values": [
     *             {
     *               "description": "Improvement Issue Type",
     *               "hierarchyLevel": -1,
     *               "iconUrl": "www.example.com",
     *               "id": "1000L",
     *               "name": "Improvements",
     *               "subtask": true
     *             }
     *           ]
     *         }
     *       },
     *       "projectIds": [
     *         "10003",
     *         "10004",
     *         "10005"
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    getIssueTypeSchemeForProjects: async ({
      startAt,
      maxResults,
      projectId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of project IDs. To include multiple project IDs, provide an
       * ampersand-separated list. For example, `projectId=10000&projectId=10001`.
       */
      projectId: number[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanIssueTypeSchemeProjects>> => {
      return jiraRequest<PageBeanIssueTypeSchemeProjects>({
        path: "/rest/api/3/issuetypescheme/project",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue type scheme items.
     *
     * Only issue type scheme items used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 4,
     *   "values": [
     *     {
     *       "issueTypeSchemeId": "10000",
     *       "issueTypeId": "10000"
     *     },
     *     {
     *       "issueTypeSchemeId": "10000",
     *       "issueTypeId": "10001"
     *     },
     *     {
     *       "issueTypeSchemeId": "10000",
     *       "issueTypeId": "10002"
     *     },
     *     {
     *       "issueTypeSchemeId": "10001",
     *       "issueTypeId": "10000"
     *     }
     *   ]
     * }
     * ```
     */
    getIssueTypeSchemesMapping: async ({
      startAt,
      maxResults,
      issueTypeSchemeId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of issue type scheme IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example,
       * `issueTypeSchemeId=10000&issueTypeSchemeId=10001`.
       */
      issueTypeSchemeId?: number[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanIssueTypeSchemeMapping>> => {
      return jiraRequest<PageBeanIssueTypeSchemeMapping>({
        path: "/rest/api/3/issuetypescheme/mapping",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          issueTypeSchemeId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes an issue type from an issue type scheme.
     *
     * This operation cannot remove:
     *
     *  *  any issue type used by issues.
     *  *  any issue types from the default issue type scheme.
     *  *  the last standard issue type from an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeIssueTypeFromIssueTypeScheme: async ({
      issueTypeSchemeId,
      issueTypeId,
      opts
    }: {
      /** The ID of the issue type scheme. */
      issueTypeSchemeId: number;
      /** The ID of the issue type. */
      issueTypeId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype/{issueTypeId}",
        method: "DELETE",
        pathParams: {
          issueTypeSchemeId,
          issueTypeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Changes the order of issue types in an issue type scheme.
     *
     * The request body parameters must meet the following requirements:
     *
     *  *  all of the issue types must belong to the issue type scheme.
     *  *  either `after` or `position` must be provided.
     *  *  the issue type in `after` must not be in the issue type list.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    reorderIssueTypesInIssueTypeScheme: async ({
      issueTypeSchemeId,
      orderOfIssueTypes,
      opts
    }: {
      /** The ID of the issue type scheme. */
      issueTypeSchemeId: number;
      /**
       * @example
       * {
       *   "after": "10008",
       *   "issueTypeIds": [
       *     "10001",
       *     "10004",
       *     "10002"
       *   ]
       * }
       */
      orderOfIssueTypes: OrderOfIssueTypes;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype/move",
        method: "PUT",
        pathParams: {
          issueTypeSchemeId
        },
        body: JSON.stringify(orderOfIssueTypes),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateIssueTypeScheme: async ({
      issueTypeSchemeId,
      issueTypeSchemeUpdateDetails,
      opts
    }: {
      /** The ID of the issue type scheme. */
      issueTypeSchemeId: number;
      /**
       * @example
       * {
       *   "defaultIssueTypeId": "10002",
       *   "description": "A collection of issue types suited to use in a kanban style project.",
       *   "name": "Kanban Issue Type Scheme"
       * }
       */
      issueTypeSchemeUpdateDetails: IssueTypeSchemeUpdateDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescheme/{issueTypeSchemeId}",
        method: "PUT",
        pathParams: {
          issueTypeSchemeId
        },
        body: JSON.stringify(issueTypeSchemeUpdateDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}

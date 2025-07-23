import type {
  PageBeanIssueTypeScreenScheme,
  IssueTypeIds,
  PageBeanProjectDetails,
  IssueTypeScreenSchemeDetails,
  IssueTypeScreenSchemeId,
  IssueTypeScreenSchemeUpdateDetails,
  IssueTypeScreenSchemeMappingDetails,
  UpdateDefaultScreenScheme,
  PageBeanIssueTypeScreenSchemeItem,
  PageBeanIssueTypeScreenSchemesProjects,
  IssueTypeScreenSchemeProjectAssociation,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue type screen schemes. Use it to:
 *
 *  *  get issue type screen schemes and a list of the projects that use them.
 *  *  create issue type screen schemes.
 *  *  update issue type screen schemes.
 *  *  delete issue type screen schemes.
 *  *  associate issue type screen schemes with projects.
 *  *  append issue type to screen scheme mappings to issue type screen schemes.
 *  *  remove issue type to screen scheme mappings from issue type screen schemes.
 *  *  update default screen scheme of issue type screen scheme.
 */
export default function issueTypeScreenSchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Appends issue type to screen scheme mappings to an issue type screen scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    appendMappingsForIssueTypeScreenScheme: async ({
      issueTypeScreenSchemeId,
      issueTypeScreenSchemeMappingDetails,
      opts
    }: {
      /** The ID of the issue type screen scheme. */
      issueTypeScreenSchemeId: string;
      /**
       * @example
       * {
       *   "issueTypeMappings": [
       *     {
       *       "issueTypeId": "10000",
       *       "screenSchemeId": "10001"
       *     },
       *     {
       *       "issueTypeId": "10001",
       *       "screenSchemeId": "10002"
       *     },
       *     {
       *       "issueTypeId": "10002",
       *       "screenSchemeId": "10002"
       *     }
       *   ]
       * }
       */
      issueTypeScreenSchemeMappingDetails: IssueTypeScreenSchemeMappingDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping",
        method: "PUT",
        pathParams: {
          issueTypeScreenSchemeId
        },
        body: JSON.stringify(issueTypeScreenSchemeMappingDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Assigns an issue type screen scheme to a project.
     *
     * Issue type screen schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    assignIssueTypeScreenSchemeToProject: async ({
      issueTypeScreenSchemeProjectAssociation,
      opts
    }: {
      /**
       * @example
       * {
       *   "issueTypeScreenSchemeId": "10001",
       *   "projectId": "10002"
       * }
       */
      issueTypeScreenSchemeProjectAssociation: IssueTypeScreenSchemeProjectAssociation;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescreenscheme/project",
        method: "PUT",
        body: JSON.stringify(issueTypeScreenSchemeProjectAssociation),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates an issue type screen scheme.
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
    createIssueTypeScreenScheme: async ({
      issueTypeScreenSchemeDetails,
      opts
    }: {
      /**
       * An issue type screen scheme bean.
       *
       * @example
       * {
       *   "issueTypeMappings": [
       *     {
       *       "issueTypeId": "default",
       *       "screenSchemeId": "10001"
       *     },
       *     {
       *       "issueTypeId": "10001",
       *       "screenSchemeId": "10002"
       *     },
       *     {
       *       "issueTypeId": "10002",
       *       "screenSchemeId": "10002"
       *     }
       *   ],
       *   "name": "Scrum issue type screen scheme"
       * }
       */
      issueTypeScreenSchemeDetails: IssueTypeScreenSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeScreenSchemeId>> => {
      return jiraRequest<IssueTypeScreenSchemeId>({
        path: "/rest/api/3/issuetypescreenscheme",
        method: "POST",
        body: JSON.stringify(issueTypeScreenSchemeDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue type screen scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the issue type screen scheme is deleted.
     */
    deleteIssueTypeScreenScheme: async ({
      issueTypeScreenSchemeId,
      opts
    }: {
      /** The ID of the issue type screen scheme. */
      issueTypeScreenSchemeId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}",
        method: "DELETE",
        pathParams: {
          issueTypeScreenSchemeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue type screen scheme items.
     *
     * Only issue type screen schemes used in classic projects are returned.
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
     *       "issueTypeId": "10000",
     *       "issueTypeScreenSchemeId": "10020",
     *       "screenSchemeId": "10010"
     *     },
     *     {
     *       "issueTypeId": "10001",
     *       "issueTypeScreenSchemeId": "10021",
     *       "screenSchemeId": "10010"
     *     },
     *     {
     *       "issueTypeId": "10002",
     *       "issueTypeScreenSchemeId": "10022",
     *       "screenSchemeId": "10010"
     *     },
     *     {
     *       "issueTypeId": "default",
     *       "issueTypeScreenSchemeId": "10023",
     *       "screenSchemeId": "10011"
     *     }
     *   ]
     * }
     * ```
     */
    getIssueTypeScreenSchemeMappings: async ({
      startAt,
      maxResults,
      issueTypeScreenSchemeId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of issue type screen scheme IDs. To include multiple issue type screen
       * schemes, separate IDs with ampersand:
       * `issueTypeScreenSchemeId=10000&issueTypeScreenSchemeId=10001`.
       */
      issueTypeScreenSchemeId?: number[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanIssueTypeScreenSchemeItem>> => {
      return jiraRequest<PageBeanIssueTypeScreenSchemeItem>({
        path: "/rest/api/3/issuetypescreenscheme/mapping",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          issueTypeScreenSchemeId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue type screen schemes and, for
     * each issue type screen scheme, a list of the projects that use it.
     *
     * Only issue type screen schemes used in classic projects are returned.
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
     *   "total": 1,
     *   "values": [
     *     {
     *       "issueTypeScreenScheme": {
     *         "id": "1",
     *         "name": "Default Issue Type Screen Scheme",
     *         "description": "The default issue type screen scheme"
     *       },
     *       "projectIds": [
     *         "10000",
     *         "10001"
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    getIssueTypeScreenSchemeProjectAssociations: async ({
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
       * The list of project IDs. To include multiple projects, separate IDs with
       * ampersand: `projectId=10000&projectId=10001`.
       */
      projectId: number[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanIssueTypeScreenSchemesProjects>> => {
      return jiraRequest<PageBeanIssueTypeScreenSchemesProjects>({
        path: "/rest/api/3/issuetypescreenscheme/project",
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
     * Returns a [paginated](#pagination) list of issue type screen schemes.
     *
     * Only issue type screen schemes used in classic projects are returned.
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
     *   "total": 2,
     *   "values": [
     *     {
     *       "id": "1",
     *       "name": "Default Issue Type Screen Scheme",
     *       "description": "The default issue type screen scheme"
     *     },
     *     {
     *       "id": "10000",
     *       "name": "Office issue type screen scheme",
     *       "description": "Managing office projects",
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
     *     }
     *   ]
     * }
     * ```
     */
    getIssueTypeScreenSchemes: async ({
      startAt,
      maxResults,
      id,
      queryString,
      orderBy,
      expand,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of issue type screen scheme IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `id=10000&id=10001`.
       */
      id?: number[];
      /**
       * String used to perform a case-insensitive partial match with issue type screen
       * scheme name.
       */
      queryString?: string;
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `name` Sorts by issue type screen scheme name.
       *  *  `id` Sorts by issue type screen scheme ID.
       */
      orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts `projects` that, for each issue type screen schemes,
       * returns information about the projects the issue type screen scheme is assigned
       * to.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanIssueTypeScreenScheme>> => {
      return jiraRequest<PageBeanIssueTypeScreenScheme>({
        path: "/rest/api/3/issuetypescreenscheme",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          queryString,
          orderBy,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of projects associated with an issue
     * type screen scheme.
     *
     * Only company-managed projects associated with an issue type screen scheme are
     * returned.
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
    getProjectsForIssueTypeScreenScheme: async ({
      issueTypeScreenSchemeId,
      startAt,
      maxResults,
      query,
      opts
    }: {
      /** The ID of the issue type screen scheme. */
      issueTypeScreenSchemeId: number;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      query?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanProjectDetails>> => {
      return jiraRequest<PageBeanProjectDetails>({
        path: "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/project",
        method: "GET",
        pathParams: {
          issueTypeScreenSchemeId
        },
        queryParams: {
          startAt,
          maxResults,
          query
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes issue type to screen scheme mappings from an issue type screen scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the screen scheme mappings are removed from the issue type screen scheme.
     */
    removeMappingsFromIssueTypeScreenScheme: async ({
      issueTypeScreenSchemeId,
      issueTypeIds,
      opts
    }: {
      /** The ID of the issue type screen scheme. */
      issueTypeScreenSchemeId: string;
      /**
       * @example
       * {
       *   "issueTypeIds": [
       *     "10000",
       *     "10001",
       *     "10004"
       *   ]
       * }
       */
      issueTypeIds: IssueTypeIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/remove",
        method: "POST",
        pathParams: {
          issueTypeScreenSchemeId
        },
        body: JSON.stringify(issueTypeIds),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates the default screen scheme of an issue type screen scheme. The default
     * screen scheme is used for all unmapped issue types.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateDefaultScreenScheme: async ({
      issueTypeScreenSchemeId,
      updateDefaultScreenScheme,
      opts
    }: {
      /** The ID of the issue type screen scheme. */
      issueTypeScreenSchemeId: string;
      /**
       * @example
       * {
       *   "screenSchemeId": "10010"
       * }
       */
      updateDefaultScreenScheme: UpdateDefaultScreenScheme;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/default",
        method: "PUT",
        pathParams: {
          issueTypeScreenSchemeId
        },
        body: JSON.stringify(updateDefaultScreenScheme),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates an issue type screen scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateIssueTypeScreenScheme: async ({
      issueTypeScreenSchemeId,
      issueTypeScreenSchemeUpdateDetails,
      opts
    }: {
      /** The ID of the issue type screen scheme. */
      issueTypeScreenSchemeId: string;
      /**
       * The issue type screen scheme update details.
       *
       * @example
       * {
       *   "description": "Screens for scrum issue types.",
       *   "name": "Scrum scheme"
       * }
       */
      issueTypeScreenSchemeUpdateDetails: IssueTypeScreenSchemeUpdateDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}",
        method: "PUT",
        pathParams: {
          issueTypeScreenSchemeId
        },
        body: JSON.stringify(issueTypeScreenSchemeUpdateDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}

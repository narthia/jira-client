import type {
  SecurityScheme,
  SecuritySchemes,
  CreateIssueSecuritySchemeDetails,
  SecuritySchemeId,
  UpdateIssueSecuritySchemeRequestBean,
  AddSecuritySchemeLevelsRequestBean,
  UpdateIssueSecurityLevelDetails,
  SecuritySchemeMembersRequest,
  PageBeanSecurityLevel,
  SetDefaultLevelsRequest,
  PageBeanSecurityLevelMember,
  PageBeanIssueSecuritySchemeToProjectMapping,
  AssociateSecuritySchemeWithProjectDetails,
  PageBeanSecuritySchemeWithProjects,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue security schemes. Use it to get an issue
 * security scheme or a list of issue security schemes.
 *
 * Issue security schemes control which users or groups of users can view an
 * issue. When an issue security scheme is associated with a project, its security
 * levels can be applied to issues in that project. Sub-tasks also inherit the
 * security level of their parent issue.
 */
export default function issueSecuritySchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds levels and levels' members to the issue security scheme. You can add up to
     * 100 levels per request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    addSecurityLevel: async ({
      schemeId,
      addSecuritySchemeLevelsRequestBean,
      opts
    }: {
      /** The ID of the issue security scheme. */
      schemeId: string;
      /**
       * @example
       * {
       *   "levels": [
       *     {
       *       "description": "First Level Description",
       *       "isDefault": true,
       *       "members": [
       *         {
       *           "type": "reporter"
       *         },
       *         {
       *           "parameter": "jira-administrators",
       *           "type": "group"
       *         }
       *       ],
       *       "name": "First Level"
       *     }
       *   ]
       * }
       */
      addSecuritySchemeLevelsRequestBean: AddSecuritySchemeLevelsRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/{schemeId}/level",
        method: "PUT",
        pathParams: {
          schemeId
        },
        body: JSON.stringify(addSecuritySchemeLevelsRequestBean),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Adds members to the issue security level. You can add up to 100 members per
     * request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    addSecurityLevelMembers: async ({
      schemeId,
      levelId,
      securitySchemeMembersRequest,
      opts
    }: {
      /** The ID of the issue security scheme. */
      schemeId: string;
      /** The ID of the issue security level. */
      levelId: string;
      /**
       * @example
       * {
       *   "members": [
       *     {
       *       "type": "reporter"
       *     },
       *     {
       *       "parameter": "jira-administrators",
       *       "type": "group"
       *     }
       *   ]
       * }
       */
      securitySchemeMembersRequest: SecuritySchemeMembersRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}/member",
        method: "PUT",
        pathParams: {
          schemeId,
          levelId
        },
        body: JSON.stringify(securitySchemeMembersRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Associates an issue security scheme with a project and remaps security levels
     * of issues to the new levels, if provided.
     *
     * This operation is [asynchronous](#async). Follow the `location` link in the
     * response to determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    associateSchemesToProjects: async ({
      associateSecuritySchemeWithProjectDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "oldToNewSecurityLevelMappings": [
       *     {
       *       "newLevelId": "30001",
       *       "oldLevelId": "30000"
       *     }
       *   ],
       *   "projectId": "10000",
       *   "schemeId": "20000"
       * }
       */
      associateSecuritySchemeWithProjectDetails: AssociateSecuritySchemeWithProjectDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/project",
        method: "PUT",
        body: JSON.stringify(associateSecuritySchemeWithProjectDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a security scheme with security scheme levels and levels' members. You
     * can create up to 100 security scheme levels and security scheme levels' members
     * per request.
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
    createIssueSecurityScheme: async ({
      createIssueSecuritySchemeDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "Newly created issue security scheme",
       *   "levels": [
       *     {
       *       "description": "Newly created level",
       *       "isDefault": true,
       *       "members": [
       *         {
       *           "parameter": "administrators",
       *           "type": "group"
       *         }
       *       ],
       *       "name": "New level"
       *     }
       *   ],
       *   "name": "New security scheme"
       * }
       */
      createIssueSecuritySchemeDetails: CreateIssueSecuritySchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SecuritySchemeId>> => {
      return jiraRequest<SecuritySchemeId>({
        path: "/rest/api/3/issuesecurityschemes",
        method: "POST",
        body: JSON.stringify(createIssueSecuritySchemeDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue security scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteSecurityScheme: async ({
      schemeId,
      opts
    }: {
      /** The ID of the issue security scheme. */
      schemeId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/{schemeId}",
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
     * Returns an issue security scheme along with its security levels.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses
     * the requested issue security scheme.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultSecurityLevelId": 10021,
     *   "description": "Description for the default issue security scheme",
     *   "id": 10000,
     *   "levels": [
     *     {
     *       "description": "Only the reporter and internal staff can see this issue.",
     *       "id": "10021",
     *       "name": "Reporter Only",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/securitylevel/10021"
     *     }
     *   ],
     *   "name": "Default Issue Security Scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issuesecurityschemes/10000"
     * }
     * ```
     */
    getIssueSecurityScheme: async ({
      id,
      opts
    }: {
      /**
       * The ID of the issue security scheme. Use the [Get issue security
       * schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of
       * issue security scheme IDs.
       */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SecurityScheme>> => {
      return jiraRequest<SecurityScheme>({
        path: "/rest/api/3/issuesecurityschemes/{id}",
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
     * Returns all [issue security schemes](https://confluence.atlassian.com/x/J4lKLg).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "issueSecuritySchemes": [
     *     {
     *       "defaultSecurityLevelId": 10021,
     *       "description": "Description for the default issue security scheme",
     *       "id": 10000,
     *       "name": "Default Issue Security Scheme",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issuesecurityschemes/10000"
     *     }
     *   ]
     * }
     * ```
     */
    getIssueSecuritySchemes: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<SecuritySchemes>
    > => {
      return jiraRequest<SecuritySchemes>({
        path: "/rest/api/3/issuesecurityschemes",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue security level members.
     *
     * Only issue security level members in the context of classic projects are
     * returned.
     *
     * Filtering using parameters is inclusive: if you specify both security scheme
     * IDs and level IDs, the result will include all issue security level members
     * from the specified schemes and levels.
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
     *       "issueSecurityLevelId": "20010",
     *       "issueSecuritySchemeId": "10010",
     *       "holder": {
     *         "expand": "group",
     *         "type": "group"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getSecurityLevelMembers: async ({
      startAt,
      maxResults,
      id,
      schemeId,
      levelId,
      expand,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /**
       * The list of issue security level member IDs. To include multiple issue security
       * level members separate IDs with an ampersand: `id=10000&id=10001`.
       */
      id?: string[];
      /**
       * The list of issue security scheme IDs. To include multiple issue security
       * schemes separate IDs with an ampersand: `schemeId=10000&schemeId=10001`.
       */
      schemeId?: string[];
      /**
       * The list of issue security level IDs. To include multiple issue security levels
       * separate IDs with an ampersand: `levelId=10000&levelId=10001`.
       */
      levelId?: string[];
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Expand options include:
       *
       *  *  `all` Returns all expandable information
       *  *  `field` Returns information about the custom field granted the permission
       *  *  `group` Returns information about the group that is granted the permission
       *  *  `projectRole` Returns information about the project role granted the
       * permission
       *  *  `user` Returns information about the user who is granted the permission
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanSecurityLevelMember>> => {
      return jiraRequest<PageBeanSecurityLevelMember>({
        path: "/rest/api/3/issuesecurityschemes/level/member",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          schemeId,
          levelId,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue security levels.
     *
     * Only issue security levels in the context of classic projects are returned.
     *
     * Filtering using IDs is inclusive: if you specify both security scheme IDs and
     * level IDs, the result will include both specified issue security levels and all
     * issue security levels from the specified schemes.
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
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1,
     *   "values": [
     *     {
     *       "description": "Only the reporter and internal staff can see this issue.",
     *       "id": "10021",
     *       "isDefault": true,
     *       "issueSecuritySchemeId": "10001",
     *       "name": "Reporter Only",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issuesecurityscheme/level?id=10021"
     *     }
     *   ]
     * }
     * ```
     */
    getSecurityLevels: async ({
      startAt,
      maxResults,
      id,
      schemeId,
      onlyDefault,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /**
       * The list of issue security scheme level IDs. To include multiple issue security
       * levels, separate IDs with an ampersand: `id=10000&id=10001`.
       */
      id?: string[];
      /**
       * The list of issue security scheme IDs. To include multiple issue security
       * schemes, separate IDs with an ampersand: `schemeId=10000&schemeId=10001`.
       */
      schemeId?: string[];
      /**
       * When set to true, returns multiple default levels for each security scheme
       * containing a default. If you provide scheme and level IDs not associated with
       * the default, returns an empty page. The default value is false.
       */
      onlyDefault?: boolean;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanSecurityLevel>> => {
      return jiraRequest<PageBeanSecurityLevel>({
        path: "/rest/api/3/issuesecurityschemes/level",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          schemeId,
          onlyDefault
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue security level.
     *
     * This operation is [asynchronous](#async). Follow the `location` link in the
     * response to determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    removeLevel: async ({
      schemeId,
      levelId,
      replaceWith,
      opts
    }: {
      /** The ID of the issue security scheme. */
      schemeId: string;
      /** The ID of the issue security level to remove. */
      levelId: string;
      /**
       * The ID of the issue security level that will replace the currently selected
       * level.
       */
      replaceWith?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}",
        method: "DELETE",
        pathParams: {
          schemeId,
          levelId
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
     * Removes an issue security level member from an issue security scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeMemberFromSecurityLevel: async ({
      schemeId,
      levelId,
      memberId,
      opts
    }: {
      /** The ID of the issue security scheme. */
      schemeId: string;
      /** The ID of the issue security level. */
      levelId: string;
      /** The ID of the issue security level member to be removed. */
      memberId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}/member/{memberId}",
        method: "DELETE",
        pathParams: {
          schemeId,
          levelId,
          memberId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) mapping of projects that are using security
     * schemes. You can provide either one or multiple security scheme IDs or project
     * IDs to filter by. If you don't provide any, this will return a list of all
     * mappings. Only issue security schemes in the context of classic projects are
     * supported. **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "issueSecuritySchemeId": "10000",
     *   "projectId": "10000"
     * }
     * ```
     */
    searchProjectsUsingSecuritySchemes: async ({
      startAt,
      maxResults,
      issueSecuritySchemeId,
      projectId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /** The list of security scheme IDs to be filtered out. */
      issueSecuritySchemeId?: string[];
      /** The list of project IDs to be filtered out. */
      projectId?: string[];
    } & WithRequestOpts<TClient> = {}): Promise<
      JiraResult<PageBeanIssueSecuritySchemeToProjectMapping>
    > => {
      return jiraRequest<PageBeanIssueSecuritySchemeToProjectMapping>({
        path: "/rest/api/3/issuesecurityschemes/project",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          issueSecuritySchemeId,
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of issue security schemes.
     * If you specify the project ID parameter, the result will contain issue security
     * schemes and related project IDs you filter by. Use \{@link
     * IssueSecuritySchemeResource\#searchProjectsUsingSecuritySchemes(String, String,
     * Set, Set)\} to obtain all projects related to scheme.
     *
     * Only issue security schemes in the context of classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 10000,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issuesecurityscheme/10000",
     *   "name": "Default scheme",
     *   "description": "Default scheme description",
     *   "defaultLevel": 10001,
     *   "projectIds": [
     *     10002
     *   ]
     * }
     * ```
     */
    searchSecuritySchemes: async ({
      startAt,
      maxResults,
      id,
      projectId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /**
       * The list of issue security scheme IDs. To include multiple issue security
       * scheme IDs, separate IDs with an ampersand: `id=10000&id=10001`.
       */
      id?: string[];
      /**
       * The list of project IDs. To include multiple project IDs, separate IDs with an
       * ampersand: `projectId=10000&projectId=10001`.
       */
      projectId?: string[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanSecuritySchemeWithProjects>> => {
      return jiraRequest<PageBeanSecuritySchemeWithProjects>({
        path: "/rest/api/3/issuesecurityschemes/search",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets default issue security levels for schemes.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    setDefaultLevels: async ({
      setDefaultLevelsRequest,
      opts
    }: {
      /**
       * @example
       * {
       *   "defaultValues": [
       *     {
       *       "defaultLevelId": "20000",
       *       "issueSecuritySchemeId": "10000"
       *     },
       *     {
       *       "defaultLevelId": "30000",
       *       "issueSecuritySchemeId": "12000"
       *     }
       *   ]
       * }
       */
      setDefaultLevelsRequest: SetDefaultLevelsRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/level/default",
        method: "PUT",
        body: JSON.stringify(setDefaultLevelsRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates the issue security scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateIssueSecurityScheme: async ({
      id,
      updateIssueSecuritySchemeRequestBean,
      opts
    }: {
      /** The ID of the issue security scheme. */
      id: string;
      /**
       * @example
       * {
       *   "description": "My issue security scheme description",
       *   "name": "My issue security scheme name"
       * }
       */
      updateIssueSecuritySchemeRequestBean: UpdateIssueSecuritySchemeRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(updateIssueSecuritySchemeRequestBean),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates the issue security level.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateSecurityLevel: async ({
      schemeId,
      levelId,
      updateIssueSecurityLevelDetails,
      opts
    }: {
      /** The ID of the issue security scheme level belongs to. */
      schemeId: string;
      /** The ID of the issue security level to update. */
      levelId: string;
      /**
       * @example
       * {
       *   "description": "New level description",
       *   "name": "New level name"
       * }
       */
      updateIssueSecurityLevelDetails: UpdateIssueSecurityLevelDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}",
        method: "PUT",
        pathParams: {
          schemeId,
          levelId
        },
        body: JSON.stringify(updateIssueSecurityLevelDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
